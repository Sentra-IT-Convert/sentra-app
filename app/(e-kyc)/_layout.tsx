import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function EKYCLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#000264" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
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
        name="verification-ktp"
        options={{
          headerShown: true,
          title: "Verifikasi e-KTP",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      {/* <Stack.Screen
        name="camera-ktp"
        options={{ headerShown: true, title: "" }}
      /> */}
      <Stack.Screen
        name="confirm-ktp"
        options={{
          headerShown: true,
          title: "Verifikasi e-KTP",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="verification-face"
        options={{
          headerShown: true,
          title: "Verifikasi wajah",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      {/* <Stack.Screen
        name="camera-face"
        options={{ headerShown: true, title: "" }}
      /> */}
    </Stack>
  );
}
