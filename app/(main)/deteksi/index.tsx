import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {};

const Deteksi = (props: Props) => {
  const router = useRouter();
  const handleCameraAccess = async () => {
    router.push("/(main)/deteksi/money-detection");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-400">
      <View className="items-center justify-center mt-2 py-2">
        <Text className="text-white text-lg font-bold">
          Selamat Datang di Sentra Detection
        </Text>
      </View>

      <View className="bg-white flex-1 rounded-t-3xl mt-2 p-4">
        <View className="flex-row justify-center items-center mb-2">
          <View className="flex-row justify-center items-end">
            <Image
              source={require("../../../assets/images/sentra-blue.png")}
              className="w-12 h-12"
            />
            <Text className="font-bold text-3xl text-primary-400 -ml-2">
              entra
            </Text>
          </View>
        </View>

        <Text className="text-center text-black font-normal mb-6 leading-6">
          Fitur pendeteksi nominal dan keaslian uang kertas untuk orang yang
          kesulitan dalam melihat
        </Text>

        <Text className="text-center font-bold text-lg mb-4">
          Ambil foto uang kertas
        </Text>

        <View className="gap-4 px-2 w-full">
          <View className="flex-row items-center">
            <Entypo name="camera" size={32} color="#00027d" />
            <Text className="ml-2 text-primary-600 font-normal text-sm flex-1">
              Berikan akses kamera anda kepada kami
            </Text>
          </View>

          <View className="h-0.5 bg-primary-400"></View>

          <View className="flex-row items-center">
            <Entypo name="box" size={32} color="#00027d" />
            <Text className="ml-2 text-primary-600 font-normal text-sm flex-1 leading-4">
              Pastikan tidak ada barang lain yang menghalangi uang kertas
            </Text>
          </View>

          <View className="h-0.5 bg-primary-400"></View>

          <View className="flex-row items-center">
            <MaterialIcons name="sunny" size={32} color="#00027d" />
            <Text className="ml-2 text-primary-600 font-normal text-sm flex-1 leading-4">
              Ambil gambar uang kertas anda di area pencahayaan yang cukup
            </Text>
          </View>

          <View className="h-0.5 bg-primary-400"></View>
        </View>

        <TouchableOpacity
          onPress={handleCameraAccess}
          className="bg-primary-400 w-full py-4 rounded-2xl mt-10"
        >
          <Text className="text-center text-white font-bold text-lg">
            AKSES KE KAMERA
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Deteksi;
