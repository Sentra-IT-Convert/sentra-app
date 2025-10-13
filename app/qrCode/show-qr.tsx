import { useUser } from "@/features/auth/hooks/use-user";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShowQR = () => {
  const router = useRouter();
  const accountNumber = "0869913361910";
  const { data } = useUser();
  const handleSoundPress = () => {
    console.log("Playing sound guidance");
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-center px-6">
          <Text className="text-base text-center text-gray-600 mr-2">
            QR ini hanya untuk scan di mesin kasir, jangan bagikan ke siapapun
          </Text>
        </View>

        <TouchableOpacity
          className="items-center pt-4"
          onPress={handleSoundPress}
        >
          <Ionicons name="volume-high" size={32} color="#0033A0" />
        </TouchableOpacity>

        <View className="items-center justify-center flex-1 px-8 mt-6">
          <View className="bg-primary-400 p-6 rounded-xl">
            <View className="bg-white p-6 rounded-lg">
              <Image
                source={require("@/assets/images/image.png")}
                resizeMode="contain"
                style={{ width: 220, height: 220 }}
              />
            </View>
          </View>
        </View>

        <View className="p-6">
          <Text className="text-sm text-gray-500 font-bold mb-4">
            Sumber Dana
          </Text>

          <TouchableOpacity
            onPress={() => {
              console.log("Card pressed");
            }}
            className="w-full rounded-xl overflow-hidden flex-row shadow-sm"
          >
            <View className="flex-1 bg-white p-3">
              <Text className="text-black font-base text-lg">
                Tabungan Sentra
              </Text>
              <Text className="text-black font-bold text-base mt-1">
                {data?.phone_number || "089506349810"}
              </Text>
            </View>
            <View className="bg-primary-400 w-16 items-center justify-center">
              <Image
                className="w-12 h-14"
                resizeMode="contain"
                source={require("@/assets/images/sentra-logo.png")}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShowQR;
