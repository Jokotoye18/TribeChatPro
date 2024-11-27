import { Stack } from "expo-router";
import "react-native-reanimated";

export default function NaivgatorLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="chatroom"
        options={{
          headerShown: true,
          headerBackTitle: "Chats",
          title: "Chat room",
        }}
      />
    </Stack>
  );
}
