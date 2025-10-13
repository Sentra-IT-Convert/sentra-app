import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type LogoutModalProps = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white w-4/5 rounded-2xl p-6 items-center">
          <View className="mb-4 flex items-center justify-center">
            <Ionicons name="exit-sharp" size={150} color="#00027d" />
          </View>

          <Text className="text-center text-lg font-bold mb-6 text-gray-800">
            Apakah anda yakin ingin keluar dari akun anda?
          </Text>

          <View className="w-full space-y-4 gap-y-4">
            <TouchableOpacity
              onPress={onConfirm}
              className="w-full bg-[#C5221F] py-3 rounded-xl"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center text-lg font-bold">
                Log Out
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onClose}
              className="w-full bg-[#4CAF50] py-3 rounded-xl"
              activeOpacity={0.8}
            >
              <Text className="text-white text-center text-lg font-bold">
                Kembali
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LogoutModal;
