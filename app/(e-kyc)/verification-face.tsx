import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {};

const VerificationFace = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeepLink = useCallback((event: { url: string }) => {
    const { url } = event;
    const parsed = Linking.parse(url);
    const status = parsed.queryParams?.status;

    if (status === "verified") {
      router.push("/(main)/home");
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", handleDeepLink);
    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink({ url });
    });
    return () => subscription.remove();
  }, [handleDeepLink]);

  const startFaceVerification = () => {
    setIsLoading(true);

    const returnApp = Linking.createURL("status", {
      queryParams: { status: "verified" },
    });
    const webUrl = `https://sentra-web-e8ma.vercel.app/face?returnApp=${encodeURIComponent(
      returnApp
    )}`;
    Linking.openURL(webUrl);
  };

  const skipVerification = () => {
    router.replace("/(main)/home");
  };

  return (
    <SafeAreaView className="bg-primary-600 flex-1 items-center justify-center w-full h-full">
      <StatusBar style="light" backgroundColor="#0b0f6b" translucent={false} />
      <View
        style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        className="bg-white border rounded-t-3xl rounded-lg w-full h-full space-y-4"
      >
        <ScrollView
          className="p-6 flex-grow flex-col"
          contentInsetAdjustmentBehavior="automatic"
          contentContainerStyle={{
            paddingTop: 12,
            paddingBottom: Math.max(insets.bottom, 24),
          }}
        >
          <View className="flex flex-row items-center justify-between w-full">
            <Text className="font-bold text-primary-400 text-2xl flex-1">
              Verifikasi wajah
            </Text>
            <TouchableOpacity onPress={skipVerification}>
              <Text className="text-primary-400 text-2xl font-bold">{` SKIP >`}</Text>
            </TouchableOpacity>
          </View>
          <View className="mt-2">
            <Text className="text-base">Kami ingin kenal kamu lebih jauh</Text>
          </View>
          <View className="flex items-center justify-center">
            <Image
              source={require("@/assets/images/verification-face.png")}
              className="mt-2 "
              resizeMode="contain"
            />
          </View>
          <View className="border-4 border-primary-400 p-4 rounded-lg w-auto mt-2">
            <View className="flex flex-row items-center justify-center gap-x-3">
              <MaterialCommunityIcons
                name="lightbulb-on-outline"
                size={30}
                color="#00027d"
              />
              <Text className="text-sm flex-1">
                Pastiin kamu ada di tempat terang
              </Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-x-3 mt-2">
              <FontAwesome6 name="face-grin" size={30} color="#00027d" />
              <Text className="text-sm flex-1">
                Lepas aksesori yang dipakai di muka seperti masker, topi, atau
                kacamata
              </Text>
            </View>

            <View className="flex flex-row items-center justify-center gap-x-3 mt-2">
              <MaterialIcons name="verified" size={30} color="#00027d" />
              <Text className="text-sm flex-1">
                Ikutin panduan yang ada dari arahan suara ya!
              </Text>
            </View>
          </View>

          <View className="flex flex-col mt-8 gap-y-4">
            <TouchableOpacity
              onPress={startFaceVerification}
              className="bg-primary-400 items-center py-4 px-4 rounded-3xl"
            >
              <Text className="text-white font-bold text-2xl text-center">
                Lanjut
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={skipVerification}
              className="bg-primary-400 items-center py-4 px-4 rounded-3xl"
            >
              <Text className="text-white font-bold text-2xl text-center">
                Skip
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View className="absolute left-0 right-0 top-1/3 items-center justify-center z-50">
              <ActivityIndicator size="large" color="#00027d" />
              <Text className="text-primary-400 mt-2 text-base font-medium">
                Memuat...
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default VerificationFace;
