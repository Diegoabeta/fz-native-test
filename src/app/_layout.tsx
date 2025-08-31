import { Stack } from "expo-router";
import { KeyboardAvoidingView, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "../../global.css";
import { Colors } from "../constants/colors";
import { UserProvider } from "../contexts/users";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <UserProvider>
          <KeyboardAvoidingView className="flex-1">
            <StatusBar
              backgroundColor={Colors.primary}
              barStyle="light-content"
            />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="user/[id]" options={{ title: "Usuario" }} />
            </Stack>
          </KeyboardAvoidingView>
        </UserProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
