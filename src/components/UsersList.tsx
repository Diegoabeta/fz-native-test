import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { useUsers } from "../contexts/users";
import { Header } from "./Header";
import { UserItem } from "./UserItem";

export const UsersList: React.FC = () => {
  const { users, deleteUser, loading } = useUsers();

  const emptyState = () =>
    loading ? (
      <View className="flex-1 justify-center items-center py-12">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    ) : (
      <Text className="text-center text-gray-500 py-12">No users found</Text>
    );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <UserItem user={item} onDelete={deleteUser} />}
      contentContainerStyle={{ gap: 16, paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<Header text="Consulta y Registro de Usuarios" />}
      ListEmptyComponent={emptyState}
    />
  );
};
