import { Audio } from "expo-av";
import { useRouter, type Href } from "expo-router";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert } from "react-native";
import { sendVoiceCommand } from "../services/voice";
import { VoiceCommandResponse } from "../types/voice";
import { resolveSpokenPage } from "../utils/voice";

type Ctx = {
  isRecording: boolean;
  busy: boolean;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  toggle: () => Promise<void>;
};

const VoiceCommandContext = createContext<Ctx | undefined>(undefined);

const MAX_DURATION_MS = 10_000;

export function VoiceCommandProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [rec, setRec] = useState<Audio.Recording | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      rec?.stopAndUnloadAsync().catch(() => {});
    };
  }, [rec]);

  async function start() {
    if (isRecording || busy) return;

    try {
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return Alert.alert("Izin mikrofon diperlukan");

      setBusy(true);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false,
      });

      const r = new Audio.Recording();
      await r.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await r.startAsync();

      setRec(r);
      setIsRecording(true);

      timeoutRef.current = setTimeout(() => {
        stop().catch(() => {});
      }, MAX_DURATION_MS);
    } catch (e) {
      Alert.alert("Error", "Gagal memulai perekaman suara");
    } finally {
      setBusy(false);
    }
  }

  async function stop() {
    if (!rec) {
      Alert.alert("Tidak ada rekaman aktif");
      return;
    }

    setIsRecording(false);
    setBusy(true);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    try {
      await rec.stopAndUnloadAsync();
      const uri = rec.getURI();
      setRec(null);
      if (!uri) throw new Error("URI audio tidak ditemukan");

      const res = await sendVoiceCommand(uri);
      await handle(res);
    } catch (e: any) {
      Alert.alert("Error", e?.message ?? "Gagal memproses perintah suara");
    } finally {
      setBusy(false);
    }
  }

  async function handle(r: VoiceCommandResponse) {
    try {
      if (r.audio_url) {
        const { sound } = await Audio.Sound.createAsync({ uri: r.audio_url });
        await sound.playAsync();
      }
    } catch {}

    if (r.action === "navigate") {
      const href = resolveSpokenPage(r.metadata?.page ?? r.text) as Href | null;
      if (href) {
        router.push(href);
      } else {
        Alert.alert("Info", r.text || "Halaman tidak dikenali");
      }
      return;
    }

    Alert.alert("Info", r.text || "Perintah belum dikenali");
  }

  async function toggle() {
    if (busy) return;
    return isRecording ? stop() : start();
  }

  return (
    <VoiceCommandContext.Provider
      value={{ isRecording, busy, start, stop, toggle }}
    >
      {children}
    </VoiceCommandContext.Provider>
  );
}

export function useVoiceCommand() {
  const ctx = useContext(VoiceCommandContext);
  if (!ctx)
    throw new Error(
      "useVoiceCommand must be used within <VoiceCommandProvider>"
    );
  return ctx;
}
