import React from "react";
import { View } from "react-native";
import { ActionCard } from "./action-card";

type Feature = {
  label: string;
  color: "green" | "red" | "indigo";
  icon: string;
  onPress: () => void;
};

type Props = { features: Feature[] };

export function TransactionMenu({ features }: Props) {
  return (
    <View className="flex-row gap-3 mt-3">
      {features.map((f) => (
        <ActionCard
          key={f.label}
          label={f.label}
          color={f.color}
          icon={f.icon}
          onPress={f.onPress}
        />
      ))}
    </View>
  );
}
