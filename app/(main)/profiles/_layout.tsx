import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function ProfileLayout() {
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
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Profile",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="edit-profile"
        options={{
          headerShown: false,
          title: "Edit Profile",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="edit-email"
        options={{
          headerShown: true,
          title: "Ubah Email",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="edit-phone"
        options={{
          headerShown: true,
          title: "Ubah Nomor HP",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="verification-email"
        options={{
          headerShown: true,
          title: "Verifikasi Email",
          headerTitleAlign: "left",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="verification-hp"
        options={{
          headerShown: true,
          title: "Verifikasi HP",
          headerTitleAlign: "left",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
    </Stack>
  );
}
