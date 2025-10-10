import { useQueryClient } from "@tanstack/react-query";
import { Audio } from "expo-av";
import { useRouter, type Href } from "expo-router";
import * as Speech from "expo-speech";
import React, { createContext, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import { sendVoiceChat } from "../services/voice";
import { VoiceChatResponse } from "../types/voice";
import { normalizeTarget, resolveSpokenPage } from "../utils/voice";

type VoiceContextValue = {
  isRecording: boolean;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  toggle: () => Promise<void>;
  busy: boolean;
};

const VoiceContext = createContext<VoiceContextValue | undefined>(undefined);

export function VoiceProvider({ children }: { children: React.ReactNode }) {
  const [isRecording, setIsRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const router = useRouter();
  const queryClient = useQueryClient();

  const isTransactionQuery = (q: any) =>
    Array.isArray(q.queryKey) && q.queryKey[0] === "transactions";

  async function refreshTransactions() {
    await queryClient.invalidateQueries({ predicate: isTransactionQuery });
    await queryClient.refetchQueries({
      predicate: isTransactionQuery,
      type: "all",
    });
  }

  const LoadingOverlay = () => (
    <Modal visible={busy} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );

  function playTTS(url?: string) {
    if (!url) return;
    Audio.Sound.createAsync({ uri: url })
      .then(({ sound }) => {
        sound.playAsync().catch(() => {});
        sound.setOnPlaybackStatusUpdate((status: any) => {
          if (status?.didJustFinish || status?.isLoaded === false) {
            sound.unloadAsync().catch(() => {});
          }
        });
      })
      .catch((err) => {
        console.warn("TTS failed:", err?.message ?? err);
      });
  }

  async function start() {
    if (isRecording || busy) return;
    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) {
        Alert.alert("Izin mikrofon diperlukan");
        return;
      }

      setBusy(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false,
      });

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      await rec.startAsync();

      setRecording(rec);
      setIsRecording(true);
    } catch (err: any) {
      console.error("❌ Gagal memulai rekaman:", err);
      Alert.alert("Error", "Gagal memulai perekaman suara");
    } finally {
      setBusy(false);
    }
  }

  async function stop() {
    if (!recording) {
      Alert.alert("Tidak ada rekaman aktif");
      return;
    }

    setIsRecording(false);
    setBusy(true);

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);

      if (!uri) throw new Error("URI audio tidak ditemukan");

      const res = await sendVoiceChat(uri);
      await handleResponse(res);
    } catch (err: any) {
      console.error("❌ Gagal menghentikan / memproses rekaman:", err);
      Alert.alert("Error", err?.message ?? "Gagal memproses perintah suara");
    } finally {
      setBusy(false);
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
          staysActiveInBackground: false,
        });
      } catch {}
    }
  }

  async function handleResponse(r: VoiceChatResponse) {
    console.log("🎧 Voice response:", r);

    if (r?.text) {
      Speech.speak(r.text, {
        language: "id-ID",
        pitch: 1,
        rate: 1.0,
      });
    }

    if (r.action === "navigate") {
      const fromServer = r.target as Href | undefined;
      const fromTranscript = resolveSpokenPage(r.transcript);
      let target = normalizeTarget(fromServer ?? fromTranscript);

      if (target) {
        try {
          router.push(target);
        } catch (e) {
          console.error("❌ Navigasi gagal:", e);
          Alert.alert("Navigasi gagal", r.text || "Perintah suara diproses");
        }
      } else {
        Alert.alert("Tujuan tidak dikenali", r.text || "Coba ucapkan lagi.");
      }

      playTTS(r.audio_url);
      return;
    }

    if (r.action === "transaction") {
      playTTS(r.audio_url);
      Alert.alert("✅ Transaksi Disimpan", r.text);
      await refreshTransactions();
      return;
    }

    playTTS(r.audio_url);
    if (r.text) Alert.alert("Info", r.text);
  }

  async function toggle() {
    if (busy) return;
    return isRecording ? stop() : start();
  }

  return (
    <VoiceContext.Provider value={{ isRecording, start, stop, toggle, busy }}>
      {children}
      <LoadingOverlay />
    </VoiceContext.Provider>
  );
}

export function useVoice() {
  const ctx = useContext(VoiceContext);
  if (!ctx) throw new Error("useVoice must be used within <VoiceProvider>");
  return ctx;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
});
