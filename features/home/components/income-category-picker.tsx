import type { CategoryOption } from "@/features/home/data/home";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PickerProps = {
  value: CategoryOption | null;
  onChange: (opt: CategoryOption) => void;
  options: CategoryOption[];
  placeholder?: string;
  tintColor?: string;
};

export function CategoryPicker({
  value,
  onChange,
  options,
  placeholder = "Pilih Kategori",
  tintColor = "#374151",
}: PickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between rounded-xl border border-gray-300 px-5 py-4 bg-white"
      >
        <View className="flex-row items-center gap-2 flex-1">
          {value ? value.icon({ color: tintColor, size: 18 }) : null}
          <Text
            className={value ? "text-gray-900" : "text-gray-400"}
            numberOfLines={1}
          >
            {value ? value.title : placeholder}
          </Text>
        </View>
        <Text className="text-gray-400">▾</Text>
      </Pressable>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          className="flex-1 bg-black/30"
          onPress={() => setOpen(false)}
        >
          <View className="absolute left-4 right-4 top-1/4 rounded-2xl bg-white p-3">
            <Text className="text-base font-semibold mb-2">Pilih kategori</Text>
            <ScrollView className="max-h-96">
              {options.map((opt) => (
                <TouchableOpacity
                  key={opt.value}
                  className="p-3 rounded-lg flex-row items-center gap-3 active:bg-gray-50"
                  onPress={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt.icon({ color: tintColor, size: 18 })}
                  <Text className="text-gray-900">{opt.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
