import { useQrisWS } from "@/features/qr/hooks/use-qr";
import { useSpeech } from "@/features/qr/hooks/use-qr-voice-speech";
import { base64ToUint8Array } from "@/lib/base64";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ShowQR() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const { connected, lastMessage, sendBinary } = useQrisWS();
  const { say } = useSpeech();

  const [borderColor, setBorderColor] = useState("white");
  const [serverText, setServerText] = useState<string>("");
  const borderAnim = useRef(new Animated.Value(0)).current;

  const animateBorder = (toColor: string) => {
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setBorderColor(toColor);
      borderAnim.setValue(0);
    });
  };

  useEffect(() => {
    if (!connected) return;
    let stop = false;

    const loop = async () => {
      if (stop) return;
      try {
        const pic = await cameraRef.current?.takePictureAsync({
          base64: true,
          quality: 0.4,
          skipProcessing: true,
        });
        if (pic?.base64) {
          const bytes = base64ToUint8Array(pic.base64);
          sendBinary(bytes);
        }
      } catch {}
      setTimeout(loop, 100);
    };

    loop();
    return () => {
      stop = true;
    };
  }, [connected, sendBinary]);

  useEffect(() => {
    if (!lastMessage) return;
    const msg = (lastMessage as any).message;

    if (typeof msg === "string" && msg.length > 0) {
      const lower = msg.toLowerCase();
      setServerText(msg); // tampilkan pesan ke UI
      say(msg);

      if (lower.includes("kurang dekat")) animateBorder("#FFD700");
      else if (lower.includes("berhasil")) animateBorder("#00FF7F");
      else if (lower.includes("tidak terdeteksi")) animateBorder("#FF6347");
      else if (lower === "ok") animateBorder("#00FF7F");
      else animateBorder("white");
    }

    if (lastMessage.type === "qris") {
      setServerText("QRIS berhasil terdeteksi.");
      say("QRIS berhasil terdeteksi.");
      animateBorder("#00FF7F");
    }
  }, [lastMessage, say]);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.paragraph}>Kami butuh izin kamera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Izinkan</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1 }}>
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />
        <View style={StyleSheet.absoluteFill}>
          <Text style={styles.bannerText}>
            {connected
              ? "Arahkan kamera ke QRIS, sistem akan memberi tahu jarak."
              : "Menghubungkan ke server deteksi…"}
          </Text>

          {serverText.length > 0 && (
            <View style={styles.messageContainer}>
              <Text
                style={[
                  styles.serverMessage,
                  borderColor === "#00FF7F" && { color: "#00FF7F" },
                  borderColor === "#FFD700" && { color: "#FFD700" },
                  borderColor === "#FF6347" && { color: "#FF6347" },
                ]}
              >
                {serverText}
              </Text>
            </View>
          )}

          <View style={styles.overlay}>
            <Animated.View
              style={[styles.scanArea, { borderColor: borderColor }]}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 10,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  paragraph: { textAlign: "center", fontSize: 16, marginBottom: 12 },
  button: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: { color: "white", fontSize: 16 },
  bannerText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginTop: 12,
  },
  messageContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    alignItems: "center",
  },
  serverMessage: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
});
