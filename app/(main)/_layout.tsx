import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs, useRouter } from "expo-router";
import React, { ReactNode } from "react";
import {
  GestureResponderEvent,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CenterTabButtonProps {
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
}

const CenterTabButton: React.FC<CenterTabButtonProps> = ({
  children,
  onPress,
}) => (
  <TouchableOpacity
    style={styles.centerButtonContainer}
    onPress={onPress}
    activeOpacity={0.4}
    accessibilityRole="button"
  >
    <View style={styles.centerButton}>{children}</View>
    <Image
      source={require("@/assets/images/qrcode.png")}
      style={styles.qrisImage}
      resizeMode="contain"
    />
  </TouchableOpacity>
);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {},
          default: {
            position: "absolute",
            height: 60 + insets.bottom,
            paddingBottom: insets.bottom,
            borderTopWidth: 0,
            backgroundColor: "white",
            elevation: 3,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 4 },
          },
        }),
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "normal",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deteksi"
        options={{
          title: "Deteksi",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="money" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: "QRCode",
          tabBarButton: () => {
            const router = useRouter();
            return (
              <CenterTabButton onPress={() => router.push("/qrCode/scan-qr")}>
                <MaterialCommunityIcons name="qrcode" size={36} color="white" />
              </CenterTabButton>
            );
          },
        }}
      />

      <Tabs.Screen
        name="literasi"
        options={{
          title: "Literasi",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="book-open" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  centerButtonContainer: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButton: {
    width: 55,
    height: 55,
    borderRadius: 15,
    backgroundColor: Colors["light"].tint,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: { width: 4, height: 4 },
    gap: 4,
  },
  qrisImage: {
    width: 40,
    height: 20,
    marginTop: 4,
  },
});
