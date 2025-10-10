import LoginForm from "@/features/auth/components/forms/login-form";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Login() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-[#00027d]" edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#0b0f6b" translucent={false} />

      <View className="flex-1">
        <View
          className="flex-1 bg-white rounded-t-3xl"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingTop: 12,
              paddingBottom: Math.max(insets.bottom, 24),
            }}
            className="px-6"
          >
            <View className="w-full">
              <Text className="text-2xl font-bold text-[#00027d]">
                Selamat datang kembali!
              </Text>
              <Text className="text-sm">
                Halo, mari log in untuk masuk ke aplikasi
              </Text>
            </View>

            <View className="items-center mt-3 mb-4">
              <Image source={require("@/assets/images/key.png")} />
            </View>

            <LoginForm />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
