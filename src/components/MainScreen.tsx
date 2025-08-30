import { Text, View } from "react-native";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface IProps extends SafeAreaViewProps {
  backgroundColor?: string;
}

export const MainScreen: React.FC<IProps> = ({
  children,
  backgroundColor = "bg-off-white",
  ...rest
}) => {
  return (
    <SafeAreaView edges={["top"]} className="bg-white flex-1" {...rest}>
      <View className="bg-white w-full pt-6 pb-3 px-4 border-b border-primary">
        <Text className="text-primary text-left font-black text-6xl">
          Finanzauto
        </Text>
      </View>
      <View className={`flex-1 px-4 ${backgroundColor}`}>{children}</View>
    </SafeAreaView>
  );
};
