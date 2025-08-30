import { Feather } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { memo, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Colors } from "../constants/colors";
import { IUserData } from "../services/userService";
import { ConfirmModal } from "./ConfirmModal";

interface IProps {
  user: IUserData;
  onDelete: (id: string) => void;
}

const BaseUserItem: React.FC<IProps> = ({ user, onDelete }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const fullName = user.firstName + " " + user.lastName;

  const renderRightActions = () => (
    <View className="bg-pink w-20 justify-center items-center rounded-r-3xl">
      <Pressable onPress={() => setModalVisible(true)}>
        <Feather name="trash-2" size={28} color="red" />
      </Pressable>
    </View>
  );

  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={renderRightActions}
      containerStyle={{
        backgroundColor: Colors.pink,
        borderRadius: 24,
      }}
    >
      <ConfirmModal
        visible={modalVisible}
        onConfirm={() => {
          onDelete(user.id);
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
        message={`¿Está seguro que desea eliminar el registro de ${fullName}?`}
      />
      <View className="bg-grey-3 rounded-3xl border-b border-gray-200 relative h-40">
        <View className="bg-light-blue absolute w-full rounded-3xl h-[75%]">
          <View className="absolute top-4 flex-row justify-start gap-8 left-6 items-center">
            {!!user.picture ? (
              <Image
                className="w-32 h-32 rounded-2xl border border-grey-1"
                source={{ uri: user.picture }}
                onError={() => {
                  user.picture = "";
                }}
              />
            ) : (
              <View className="w-32 h-32 rounded-2xl border border-grey-1 bg-white justify-center items-center">
                <FontAwesome name="user" size={100} color={Colors.grey4} />
              </View>
            )}
            <View className="w-2/4 mb-6 flex-col gap-1">
              <Text className="text-primary text-2xl font-bold">
                {fullName}
              </Text>
              <Text className="text-xs font-bold">ID: {user.id}</Text>
            </View>
          </View>
        </View>
        <Pressable
          className="absolute bottom-2 right-3 flex-row gap-4 active:opacity-60"
          onPress={
            () => console.log("to user details")
            // to do add navigation
          }
        >
          <Text className="text-primary font-semibold">Ver detalle</Text>
          <Feather name="chevron-right" size={20} color={Colors.primary} />
        </Pressable>
      </View>
    </Swipeable>
  );
};

export const UserItem = memo(BaseUserItem);
