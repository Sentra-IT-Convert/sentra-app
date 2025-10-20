import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, usePathname, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function QRLayout() {
  const router = useRouter();
  const pathname = usePathname();

  const isOnScanQR = pathname === "/qrCode/scan-qr";
  const isOnShowQR = pathname === "/qrCode/show-qr";

  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          animation: isOnShowQR
            ? "slide_from_right"
            : isOnScanQR
              ? "slide_from_left"
              : "default",
          headerTitle: () => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("@/assets/images/qr-code-blue.png")}
                style={{ resizeMode: "contain" }}
              />
              <Text
                style={{
                  color: "#00027d",
                  fontSize: 12,
                  fontFamily: "OpenSansRegular",
                }}
              >
                SUPPORTED
              </Text>
            </View>
          ),
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ paddingLeft: 12 }}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Ionicons name="chevron-back" size={32} color="#00027d" />
            </TouchableOpacity>
          ),
        }}
      >
        <Stack.Screen name="scan-qr" />
        <Stack.Screen name="show-qr" />
        <Stack.Screen
          name="pin-qr"
          options={{ headerShown: false, title: "Memasukkan Kode PIN" }}
        />
      </Stack>

      {pathname !== "/qrCode/pin-qr" && (
        <View
          style={{
            flexDirection: "row",
            height: 150,
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#e5e5e5",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 4,
            }}
            activeOpacity={0.9}
            onPress={() => {
              if (!isOnScanQR) {
                router.replace("/qrCode/scan-qr");
              }
            }}
          >
            <View
              style={{
                height: 3,
                width: 80,
                backgroundColor: isOnScanQR ? "#00027d" : "transparent",
                borderRadius: 2,
                marginBottom: 4,
              }}
            />
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={isOnScanQR ? "#00027d" : "#999"}
            />
            <Text
              style={{
                color: isOnScanQR ? "#00027d" : "#666",
                fontSize: 14,
                fontWeight: "500",
                marginTop: 2,
              }}
            >
              Scan QR
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "center",
              paddingTop: 4,
            }}
            onPress={() => {
              if (!isOnShowQR) {
                router.replace("/qrCode/show-qr");
              }
            }}
          >
            <View
              style={{
                height: 3,
                width: 60,
                backgroundColor: isOnShowQR ? "#00027d" : "transparent",
                borderRadius: 2,
                marginBottom: 4,
              }}
            />
            <Ionicons
              name="qr-code-outline"
              size={24}
              color={isOnShowQR ? "#00027d" : "#999"}
            />
            <Text
              style={{
                color: isOnShowQR ? "#00027d" : "#666",
                fontSize: 14,
                fontWeight: "500",
                marginTop: 2,
              }}
            >
              Tampilkan QR
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
