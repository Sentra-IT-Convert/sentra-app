import { useUser } from "@/features/auth/hooks/use-user";
import LogoutModal from "@/features/profiles/components/logout-modal";
import ProfileItem from "@/features/profiles/components/profiles-item";
import { clearSession } from "@/lib/sessions";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { data: user, isLoading, isError, error } = useUser();

  const handleLogout = () => {
    console.log("User logged out");
    clearSession();
    setModalVisible(false);
    router.replace("/(auth)/login");
  };

  const enableBiometric = () => {
    console.log("Enable biometric authentication");
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-primary-400 justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-primary-400 justify-center items-center">
        <Text className="text-white">Error: {error?.message}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-primary-400">
      <View className="flex-row justify-between items-center px-4 pt-10 pb-12">
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-white p-2 rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color="#000080" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Profil</Text>
        <TouchableOpacity className="bg-white p-2 rounded-full">
          <Ionicons name="notifications-outline" size={24} color="#000080" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 relative min-h-screen">
        <View className="bg-white rounded-t-3xl absolute bottom-0 left-0 right-0 h-full">
          <View className="items-center pt-16 mb-4">
            <Text className="text-blue-900 text-xl font-bold">{user.name}</Text>
            <Text className="text-black">
              <Text className="font-bold">ID: </Text>
              {user.id}
            </Text>
          </View>

          <ScrollView className="px-4 flex-1">
            <ProfileItem
              icon={<AntDesign name="user" size={24} color="white" />}
              title="Edit Profile"
              onPress={() => router.push("/(main)/profiles/edit-profile")}
            />
            <ProfileItem
              icon={<Ionicons name="shield" size={24} color="white" />}
              title="Security"
            />
            <ProfileItem
              icon={<Ionicons name="settings-sharp" size={24} color="white" />}
              title="Setting"
            />
            {/* <ProfileItem
              onPress={enableBiometric}
              icon={<Ionicons name="finger-print" size={24} color="white" />}
              title="Autentikasi Sidik Jari"
            /> */}
            <ProfileItem
              icon={<Feather name="log-out" size={24} color="white" />}
              title="Logout"
              onPress={() => setModalVisible(true)}
            />
          </ScrollView>
        </View>

        <View className="absolute left-0 right-0 -top-10 items-center">
          <View className="bg-white rounded-full">
            <Image
              source={{
                uri:
                  user?.profile_photo_url || "https://i.pravatar.cc/150?img=11",
              }}
              className="w-24 h-24 rounded-full"
            />
          </View>
        </View>
      </View>

      <LogoutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={handleLogout}
      />
    </SafeAreaView>
  );
}
