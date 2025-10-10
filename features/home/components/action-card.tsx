import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  color: "green" | "red" | "indigo";
  icon: string;
  onPress?: () => void;
};

const COLORS = {
  green: {
    bg: "bg-[#Dbffe4]",
    border: "border-[#16A34A]",
    text: "text-[#16A34A]",
    circle: "bg-[#aaecba]",
    icon: "#166534",
  },
  red: {
    bg: "bg-[#FEE2E2]",
    border: "border-[#DC2626]",
    text: "text-[#DC2626]",
    circle: "bg-[#Fdb7b7]",
    icon: "#991B1B",
  },
  indigo: {
    bg: "bg-[#E6e6f2]",
    border: "border-[#4338CA]",
    text: "text-[#4338CA]",
    circle: "bg-[#b0b1d7]",
    icon: "#00027d",
  },
};

export function ActionCard({ label, color, icon, onPress }: Props) {
  const c = COLORS[color];

  return (
    <Pressable
      onPress={onPress}
      className="flex-1 max-w-[33%]"
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.95 : 1 }],
          shadowOpacity: pressed ? 0.15 : 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: pressed ? 5 : 2,
        },
      ]}
    >
      {({ pressed }) => (
        <View
          className={[
            "rounded-2xl px-4 py-5 items-center justify-center border",
            c.bg,
            c.border,
          ].join(" ")}
          style={{
            opacity: pressed ? 0.8 : 1,
          }}
        >
          <View
            className={`h-10 w-10 rounded-full items-center justify-center ${c.bg}`}
          >
            <View
              className={`h-12 w-12 rounded-full items-center justify-center ${c.circle}`}
            >
              <MaterialCommunityIcons
                name={icon as any}
                size={26}
                color={c.icon}
              />
            </View>
          </View>
          <Text className={`mt-3 text-[12px] font-semibold ${c.text}`}>
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
