import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { CategoryOption, incomeCategories } from "../data/home";
import { CategoryPicker } from "./income-category-picker";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave?: (payload: {
    amount: number;
    note: string;
    category: string;
  }) => void;
};

export default function IncomeModal({ visible, onClose, onSave }: Props) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [cat, setCat] = useState<CategoryOption | null>(null);
  const [recording, setRecording] = useState(false);

  const canSave = Number(amount) > 0 && !!cat;

  const handleSave = () => {
    if (!canSave) return;
    onSave?.({ amount: Number(amount || 0), note, category: cat!.value });
    setAmount("");
    setNote("");
    onClose();
  };

  const onMicPress = async () => {
    setRecording((v) => !v);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          onClose();
        }}
      >
        <View className="flex-1 bg-black/30" />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="absolute inset-x-0 top-[10%] items-center"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="w-11/12 rounded-3xl bg-white overflow-hidden">
            <View className="px-4 py-4 bg-[#E8FBEF] flex-row justify-between items-center">
              <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 rounded-full bg-[#AAECBA] items-center justify-center">
                  <MaterialCommunityIcons
                    name="plus"
                    size={22}
                    color="#006D19"
                  />
                </View>
                <View>
                  <Text className="text-[#145C3B] font-bold text-lg">
                    Tambah Pemasukan
                  </Text>
                  <Text className="text-[#444] text-sm">
                    Isi form di bawah dengan lengkap
                  </Text>
                </View>
              </View>
              <Pressable onPress={onClose}>
                <MaterialCommunityIcons
                  name="close"
                  size={22}
                  color="#145C3B"
                />
              </Pressable>
            </View>

            <View className="p-4 gap-3">
              <View>
                <Text className="font-bold mb-2">Jumlah (Rupiah)</Text>
                <TextInput
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="number-pad"
                  placeholder="Rp 0"
                  returnKeyType="next"
                  className="rounded-xl border border-gray-300 px-5 py-4 bg-white text-xl text-center"
                />
              </View>

              <View>
                <Text className="font-bold mb-2">Kategori</Text>
                <CategoryPicker
                  value={cat}
                  onChange={setCat}
                  options={incomeCategories as CategoryOption[]}
                  tintColor="#16A34A"
                />
              </View>

              <View>
                <Text className="font-bold mb-2">Keterangan</Text>

                <View className="relative">
                  <TextInput
                    value={note}
                    onChangeText={setNote}
                    placeholder="Contoh: Gaji Bulanan"
                    returnKeyType="done"
                    className="rounded-xl border border-gray-300 bg-white pr-12 px-5 py-4"
                  />

                  <TouchableOpacity
                    onPress={onMicPress}
                    activeOpacity={0.8}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-lg items-center justify-center"
                  >
                    {recording ? (
                      <ActivityIndicator />
                    ) : (
                      <MaterialCommunityIcons
                        name="microphone"
                        size={28}
                        color="#00027d"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSave}
                activeOpacity={0.8}
                style={{ borderRadius: 10, overflow: "hidden" }}
              >
                <LinearGradient
                  colors={
                    canSave ? ["#37FF00", "#1D8700"] : ["#9FD8BF", "#6B7280"]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 8 }}
                  style={{
                    borderRadius: 10,
                    paddingVertical: 12,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-white text-lg font-bold">
                    Simpan Pemasukan
                  </Text>
                </LinearGradient>
              </TouchableOpacity>

              <Pressable
                onPress={onClose}
                className="rounded-xl border border-gray-300 py-3 mt-2 items-center"
              >
                <Text className="font-bold text-lg text-[#252525]/60">
                  Batal
                </Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}
