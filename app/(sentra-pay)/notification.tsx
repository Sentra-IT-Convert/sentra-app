import { StatusBar } from "expo-status-bar";
import { Info } from "lucide-react-native";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {};

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  type: "info" | "success" | "warning" | "error";
}

export const notifications: Notification[] = [
  {
    id: "1",
    title: "Selamat datang kembali di Sentra!",
    message:
      "Senang bertemu dengan kamu lagi. Yuk langsung transaksi lagi di Sentra!",
    date: "15 Mar 2025",
    isRead: false,
    type: "info",
  },
  {
    id: "2",
    title: "Selamat datang kembali di Sentra!",
    message:
      "Senang bertemu dengan kamu lagi. Yuk langsung transaksi lagi di Sentra!",
    date: "15 Mar 2025",
    isRead: false,
    type: "info",
  },
  {
    id: "3",
    title: "Transfer Berhasil!",
    message: "Transfer sebesar Rp 250.000 ke Jason Surya berhasil dilakukan.",
    date: "14 Mar 2025",
    isRead: false,
    type: "success",
  },
  {
    id: "4",
    title: "Promo Spesial!",
    message:
      "Dapatkan cashback 10% untuk setiap transaksi pulsa dan paket data hari ini!",
    date: "13 Mar 2025",
    isRead: false,
    type: "info",
  },
  {
    id: "5",
    title: "Pembayaran Tagihan",
    message:
      "Jangan lupa bayar tagihan listrik Anda sebelum tanggal 20 Mar 2025.",
    date: "12 Mar 2025",
    isRead: false,
    type: "warning",
  },
  {
    id: "6",
    title: "Top Up Berhasil",
    message: "Top up saldo sebesar Rp 500.000 telah berhasil.",
    date: "10 Mar 2025",
    isRead: false,
    type: "success",
  },
  {
    id: "7",
    title: "Verifikasi Akun",
    message:
      "Tingkatkan keamanan akun Anda dengan verifikasi identitas sekarang.",
    date: "08 Mar 2025",
    isRead: false,
    type: "warning",
  },
  {
    id: "8",
    title: "Pembaruan Aplikasi",
    message:
      "Versi baru Sentra Pay telah tersedia. Update sekarang untuk fitur terbaru!",
    date: "05 Mar 2025",
    isRead: false,
    type: "info",
  },
  {
    id: "9",
    title: "Transaksi Gagal",
    message: "Pembayaran ke Merchant XYZ gagal. Silakan coba lagi.",
    date: "03 Mar 2025",
    isRead: false,
    type: "error",
  },
  {
    id: "10",
    title: "Poin Reward",
    message:
      "Selamat! Anda mendapatkan 500 poin reward dari transaksi terakhir Anda.",
    date: "01 Mar 2025",
    isRead: false,
    type: "success",
  },
];

const Notification = (props: Props) => {
  const insets = useSafeAreaInsets();
  const [readNotifications, setReadNotifications] = useState<string[]>(
    notifications.filter((n) => n.isRead).map((n) => n.id)
  );

  const handlePress = (id: string) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications([...readNotifications, id]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
      <StatusBar style="light" backgroundColor="#0b0f6b" translucent={false} />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom, 24),
        }}
      >
        {notifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            onPress={() => handlePress(notification.id)}
            className={`p-4 border-b border-gray-200 ${
              !readNotifications.includes(notification.id)
                ? "bg-blue-50"
                : "bg-white"
            }`}
          >
            <View className="flex-row">
              <View className="w-8 h-8 rounded-full bg-blue-900 items-center justify-center mr-3">
                <Info stroke="white" width={16} height={16} />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-gray-800">
                  {notification.title}
                </Text>
                <Text className="text-gray-600 mt-1">
                  {notification.message}
                </Text>
                <Text className="text-gray-400 text-xs mt-2">
                  {notification.date}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
