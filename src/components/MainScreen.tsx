import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";
import { Colors } from "../constants/colors";

interface IProps extends SafeAreaViewProps {
  title?: string;
  backButton?: boolean;
}

export const MainScreen: React.FC<IProps> = ({
  children,
  title,
  backButton,
  ...rest
}) => {
  const router = useRouter();
  return (
    <SafeAreaView className="bg-off-white flex-1 px-4 pt-6" {...rest}>
      <View
        className={`flex-row items-center  ${!backButton ? "justify-center" : "gap-6"}`}
      >
        {backButton && (
          <Pressable onPress={router.back}>
            <Ionicons name="arrow-back" size={24} color={Colors.grey1} />
          </Pressable>
        )}
        {title && <Text>{title}</Text>}
      </View>
      {children}
    </SafeAreaView>
  );
};
