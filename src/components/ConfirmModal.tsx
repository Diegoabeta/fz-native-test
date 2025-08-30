import React from "react";
import { Modal, Text, View } from "react-native";
import { Colors } from "../constants/colors";
import { Button } from "./Button";

interface IProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}

export const ConfirmModal: React.FC<IProps> = ({
  visible,
  onConfirm,
  onCancel,
  message,
}) => {
  return (
    <Modal
      backdropColor={`${Colors.primary}80`}
      visible={visible}
      animationType="fade"
    >
      <View className="flex-1 justify-center items-center">
        <View className="bg-white rounded-2xl p-8 w-4/5 flex gap-4">
          <View className="bg-grey-3 rounded-2xl p-6 w-full m-auto">
            <Text className=" text-light-green text-3xl font-black">
              Novedad
            </Text>
            <Text className=" text-primary text-5xl font-black">Eliminar</Text>
          </View>
          <Text className="text-dark text-2xl font-bold text-center mb-4">
            {message}
          </Text>
          <View className="flex justify-around gap-4 w-9/12 m-auto">
            <Button type="confirm" label="Aceptar" onPress={onConfirm} />
            <Button type="cancel" label="Cancelar" onPress={onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
