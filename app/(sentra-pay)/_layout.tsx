import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function SentraPayLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
      }}
    >
      <Stack.Screen
        name="sentra-pay"
        options={{
          headerShown: false,
          title: "Sentra Pay",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="notification"
        options={{
          headerShown: true,
          title: "Notifikasi",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
    </Stack>
  );
}
