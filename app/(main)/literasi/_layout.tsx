import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function LiterasiLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#00027d" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",
        statusBarStyle: "light",
        presentation: "card",
        animation: Platform.select({
          ios: "slide_from_right",
          android: "slide_from_right",
          default: "slide_from_right",
        }),
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "literasi",
        }}
      />

      <Stack.Screen
        name="[id]"
        options={{
          title: "Detail berita",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
    </Stack>
  );
}
