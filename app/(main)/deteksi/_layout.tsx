import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function DeteksiLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000264" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerTitleAlign: "center",

        presentation: "card",
        animation: Platform.select({
          ios: "slide_from_right",
          android: "slide_from_right",
          default: "slide_from_right",
        }),
        gestureEnabled: true,
        gestureDirection: "horizontal",
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Profile" }}
      />
      <Stack.Screen
        name="money-detection"
        options={{
          headerShown: true,
          title: "Deteksi Uang Rupiah",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
