import { MainScreen } from "@/src/components/MainScreen";
import { UserForm } from "@/src/components/UserForm";
import { Colors } from "@/src/constants/colors";
import { IUserData, UserClient } from "@/src/services/userService";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function UserScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [user, setUser] = useState<IUserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await UserClient.getUser(id!);
      if (!error && data) {
        setUser(data);
      } else {
        setError(error);
      }
      setLoading(false);
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  let content;

  if (loading) {
    content = (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  } else if (error) {
    content = (
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-red-500 text-lg font-semibold text-center">
          {error}
        </Text>
      </View>
    );
  } else if (!user) {
    content = (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">User not found</Text>
      </View>
    );
  } else {
    content = (
      <UserForm
        defaultValues={user}
        editable={false}
        title="Información del Usuario"
      />
    );
  }

  return <MainScreen backgroundColor="bg-bg-green">{content}</MainScreen>;
}
