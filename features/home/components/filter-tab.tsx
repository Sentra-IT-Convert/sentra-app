import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TABS = ["Harian", "Mingguan", "Bulanan"];

export function FiltersTab({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (item: string) => void;
}) {
  return (
    <View className="flex-row gap-3 w-full">
      {TABS.map((item) => {
        const active = selected === item;

        return (
          <TouchableOpacity
            key={item}
            onPress={() => setSelected(item)}
            activeOpacity={0.85}
            className={[
              "flex-1 rounded-xl border px-4 py-3 items-center justify-center",
              active
                ? "bg-primary-600 border-none"
                : "bg-white/90 border-primary-200 border-2",
            ].join(" ")}
            style={
              active
                ? {
                    shadowOpacity: 0.2,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 4,
                  }
                : undefined
            }
          >
            <Text
              className={[
                "font-semibold",
                active ? "text-white" : "font-bold text-[#6063c3]",
              ].join(" ")}
              numberOfLines={1}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
