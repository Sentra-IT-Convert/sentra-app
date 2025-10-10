import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

import RegisterForm from "@/features/auth/components/forms/register-form";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function Register() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-[#00027d]" edges={["bottom"]}>
      <StatusBar style="light" backgroundColor="#0b0f6b" translucent={false} />
      <View className="bg-white border-2 rounded-t-3xl rounded-lg w-full h-full mx-auto">
        <ScrollView
          className="p-6 flex-grow"
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
          }}
        >
          <View className="flex flex-col items-start justify-start">
            <Text className="font-bold text-primary-400 text-2xl">
              Selamat datang di Sentra
            </Text>
            <Text>Halo, mari buat akun baru!</Text>
          </View>
          <View className="flex items-center justify-center">
            <Image
              source={require("@/assets/images/Illustration.png")}
              className="mt-2"
            />
          </View>
          <RegisterForm />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
