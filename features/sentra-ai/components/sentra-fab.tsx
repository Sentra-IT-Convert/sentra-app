import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useVoice } from "../context/voice-transaction-context";

export default function SentraFAB() {
  const {
    toggle: toggleChat,
    isRecording: isChatRec,
    busy: chatBusy,
  } = useVoice();
  // const {
  //   toggle: toggleCommand,
  //   isRecording: isCmdRec,
  //   busy: cmdBusy,
  // } = useVoiceCommand();

  const insets = useSafeAreaInsets();

  const isRecording = isChatRec;
  const isBusy = chatBusy;

  const posStyle = {
    right: Math.max(insets.right + 20, 0),
    bottom: Math.max(insets.bottom + 80, 0),
    width: 64,
    height: 64,
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      <View style={[styles.fabWrapper, posStyle]}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={isBusy ? undefined : toggleChat}
          // onLongPress={isBusy ? undefined : toggleCommand}
          delayLongPress={500}
          accessibilityRole="button"
          accessibilityLabel="Open voice assistant"
        >
          <View
            style={[
              styles.circle,
              {
                backgroundColor: isRecording ? "#1d4ed8" : "#00027d",
                padding: 8,
              },
            ]}
          >
            <View
              style={[
                styles.inner,
                {
                  backgroundColor: isRecording ? "#2563eb" : "#161895",
                  padding: 8,
                },
              ]}
            >
              <MaterialCommunityIcons
                name={isRecording ? "microphone-off" : "microphone"}
                size={28}
                color="#fff"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fabWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  circle: { borderRadius: 9999 },
  inner: { borderRadius: 9999 },
});
