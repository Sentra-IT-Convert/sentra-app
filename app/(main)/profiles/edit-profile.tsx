import { useUpdateProfilePhoto, useUser } from "@/features/auth/hooks/use-user";
import ConfirmPhoneModal from "@/features/profiles/components/confirm-phone-modal";
import PhotoModal from "@/features/profiles/components/photo-modal";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
export const options = {
  tabBarStyle: { display: "none" },
};

export default function ProfileEdit() {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState("Tunanetra");
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const { data: user } = useUser();
  const { mutateAsync: updatePhoto, isPending } = useUpdateProfilePhoto();

  const pickImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowPhotoModal(false);
    }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setShowPhotoModal(false);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("photo", {
      uri: image,
      name: "profile.jpg",
      type: "image/jpeg",
    } as any);

    try {
      await updatePhoto(formData);
      setImage(null);
      router.back();
    } catch (error) {
      console.error("Upload gagal:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-400 w-full h-full">
      <View className="items-center justify-center mt-4">
        <TouchableOpacity>
          <Image
            source={{
              uri:
                image ||
                user.profile_photo_url ||
                "https://i.pravatar.cc/150?img=11",
            }}
            className="w-24 h-24 rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowPhotoModal(true)}>
          <Text className="text-white text-xl font-bold my-2">
            Ubah Foto Profil
          </Text>
        </TouchableOpacity>
      </View>

      <View className="w-full h-full">
        <View className="bg-white rounded-t-3xl min-h-screen">
          <View className="mb-4 px-5 py-4">
            <Text className="text-gray-800 font-medium mb-2">Nama Lengkap</Text>
            <View className="bg-[#E6E6F2] rounded-xl px-4 py-3">
              <TextInput
                className="text-gray-800"
                value={user.name}
                editable={false}
              />
            </View>
          </View>
          <View className="w-full h-2 bg-black opacity-5"></View>
          <View className="px-5 py-2">
            <View className="flex-row items-center mb-2">
              <View className="flex-1">
                <Text className="text-black font-normal">Nomor HP</Text>
                <View className="rounded-xl py-2">
                  <Text className="font-bold">{user.phone_number}</Text>
                </View>
              </View>
              <TouchableOpacity
                className="mt-6"
                onPress={() => setShowPhoneModal(true)}
              >
                <Text className="text-primary-400 font-bold">Ubah</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center mb-2">
              <View className="flex-1">
                <Text className="text-black font-normal">Email</Text>
                <View className="rounded-xl py-2">
                  <Text className="font-bold">Richardcen05@Gmail.Com</Text>
                </View>
              </View>
              <TouchableOpacity
                className="ml-2 mt-6"
                onPress={() => {
                  router.push("/(main)/profiles/edit-email");
                }}
              >
                <Text className="text-primary-400 font-bold">Ubah</Text>
              </TouchableOpacity>
            </View>

            <View className="h-0.5 bg-black opacity-5 mb-4" />

            <View className="mb-8">
              <Text className="text-black font-normal mb-2">Status Anda</Text>
              <View className="flex-row space-x-3 gap-x-6">
                {["Tunanetra", "Low Vision"].map((status) => (
                  <TouchableOpacity
                    key={status}
                    activeOpacity={0.95}
                    className={`flex-1 py-1 rounded-xl border-2 ${
                      selectedStatus === status
                        ? "bg-primary-400 border-primary-400"
                        : "bg-white border border-blue-900"
                    }`}
                    onPress={() => setSelectedStatus(status)}
                  >
                    <Text
                      className={`text-center font-bold ${
                        selectedStatus === status
                          ? "text-white"
                          : "text-blue-900"
                      }`}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <PhotoModal
              visible={showPhotoModal}
              onClose={() => setShowPhotoModal(false)}
              onPickCamera={pickImageFromCamera}
              onPickGallery={pickImageFromGallery}
            />
            <ConfirmPhoneModal
              visible={showPhoneModal}
              onClose={() => setShowPhoneModal(false)}
              onConfirm={() => {
                router.push("/(main)/profiles/edit-phone");
                setShowPhoneModal(false);
              }}
            />
            <TouchableOpacity
              className="bg-primary-400 rounded-xl py-4"
              onPress={handleUpload}
              disabled={isPending}
            >
              <Text className="text-white text-center font-bold text-lg">
                {isPending ? "Menyimpan..." : "Simpan"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
