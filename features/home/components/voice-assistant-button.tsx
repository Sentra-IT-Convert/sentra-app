import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title?: string;
  onPress?: () => void;
};

const VoiceAssistantButton: React.FC<Props> = ({
  title = "Panduan Sentra AI",
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="w-full"
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.95 : 1,
          shadowOpacity: pressed ? 0.15 : 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: pressed ? 5 : 2,
        },
      ]}
    >
      {({ pressed }) => (
        <View
          className={`flex-row items-center justify-center gap-4 rounded-2xl px-4 py-3 border ${
            pressed
              ? "bg-[#f5f5fa] border-[#3344aa]"
              : "bg-[#e6e6f2] border-[#001a73]"
          }`}
        >
          <View
            className={`h-10 w-10 rounded-full items-center justify-center ${
              pressed ? "bg-primary-100" : "bg-primary-200"
            }`}
          >
            <Ionicons name="volume-high" size={20} color="#001a73" />
          </View>
          <Text className="font-extrabold text-lg text-[#001a73]">{title}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default VoiceAssistantButton;
