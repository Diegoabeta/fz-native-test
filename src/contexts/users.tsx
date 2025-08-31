// useUsers es un custom hook que consume el UserContext, permitiendo acceder funciones como addUser y updateUser, así como al estado global de usuarios. Se utiliza para manejar la creación y actualización de datos de usuario desde cualquier componente

import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { IUserData, UserClient } from "../services/userService";
import { formatDOBToISO } from "../uitls/formatting";

interface UserContextType {
  users: IUserData[];
  loading: boolean;
  fetchUsers: () => Promise<void>;
  addUser: (user: IUserData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (id: string, user: IUserData) => Promise<void>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<IUserData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const { data, error } = await UserClient.getUsers();
    if (!error && data?.data) {
      setUsers(data.data);
    }
    setLoading(false);
  };

  const addUser = async (user: IUserData) => {
    const userToSend: IUserData = {
      ...user,
      dateOfBirth: formatDOBToISO(user.dateOfBirth),
    };

    try {
      const { data, error, status } = await UserClient.createUser(userToSend);

      if (error) {
        Alert.alert(
          "Error",
          `No se pudo crear el usuario (status ${status}) ${JSON.stringify(error?.data)}`
        );
        console.error(error?.data);
        return;
      }
      if (data) {
        setUsers((prev) => [...prev, data]);
        Alert.alert("Éxito", "Usuario creado exitosamente");
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err?.message || "Error desconocido");
    }
  };

  const updateUser = async (id: string, user: IUserData) => {
    const userToSend: IUserData = {
      ...user,
      dateOfBirth: formatDOBToISO(user.dateOfBirth),
    };

    try {
      const { data, error, status } = await UserClient.updateUser(
        id,
        userToSend
      );

      if (error) {
        Alert.alert(
          "Error",
          `No se pudo actualizar el usuario (status ${status}) ${JSON.stringify(error?.data)}`
        );
        console.error(error?.data);
        return;
      }

      if (data) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, ...data } : u))
        );
        Alert.alert("Éxito", "Usuario actualizado exitosamente!");
      }
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err?.message || "Error desconocido");
    }
  };

  const deleteUser = async (id: string) => {
    const { error } = await UserClient.deleteUser(id);
    if (!error) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
    Alert.alert("Éxito", "Usuario eliminado exitosamente!");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext
      value={{ users, loading, fetchUsers, addUser, deleteUser, updateUser }}
    >
      {children}
    </UserContext>
  );
};

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUsers must be used within a UserProvider");
  return context;
};
