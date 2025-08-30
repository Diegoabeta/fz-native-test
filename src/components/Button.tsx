import { Feather } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { Colors } from "../constants/colors";

interface IProps {
  type: "confirm" | "cancel";
  label: string;
  onPress: () => void;
}

export const Button: React.FC<IProps> = ({ type, label, onPress }) => {
  const isConfirm = type === "confirm";

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-center px-6 py-3 rounded-2xl active:opacity-50 ${
        isConfirm ? "bg-light-green" : "border border-grey-3"
      }`}
    >
      <Feather
        name={isConfirm ? "check" : "x"}
        size={14}
        color={isConfirm ? Colors.white : Colors.grey2}
        style={{ marginRight: 6 }}
      />
      <Text
        className={`font-semibold text-center ${
          isConfirm ? "text-white" : "text-grey-2"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
};
