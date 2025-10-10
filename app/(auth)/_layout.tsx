import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#000264" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold", fontSize: 22 },
        headerTitleAlign: "left",
        headerShadowVisible: false,

        statusBarStyle: "light",
        statusBarTranslucent: false,
        contentStyle: { backgroundColor: "#fff" },
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
        name="register"
        options={{
          headerShown: true,
          title: "Sign up",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          headerShown: true,
          title: "Lupa Kata Sandi",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="verification-register"
        options={{
          headerShown: true,
          title: "Verifikasi Nomor",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="verification-forgot-password"
        options={{
          headerShown: true,
          title: "Lupa Kata Sandi",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="pin"
        options={{
          headerShown: true,
          title: "Pembuatan Kode Pin",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="reset-password"
        options={{
          headerShown: true,
          title: "Reset Password",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "Log in",
          presentation: "card",
          animation:
            Platform.OS === "ios" ? "slide_from_right" : "slide_from_right",
        }}
      />
    </Stack>
  );
}
