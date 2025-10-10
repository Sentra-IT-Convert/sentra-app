import CameraPermission from "@/components/permission";
import CameraActions from "@/features/money-detection/components/camera-actions";
import SettingsModal from "@/features/money-detection/components/settings-modal";
import { useDeteksi } from "@/features/money-detection/hooks/use-money-detection";
import { DeteksiResponse } from "@/features/money-detection/types/money-detection";
import {
  speakDetectionResults,
  speakMessage,
} from "@/features/money-detection/utils/speech";
import { CameraType, CameraView } from "expo-camera";
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MoneyDetection = () => {
  const [detectedAmount, setDetectedAmount] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [beepEnabled, setBeepEnabled] = useState<boolean>(true);
  const [flashEnabled, setFlashEnabled] = useState<boolean>(true);
  const [facing, setFacing] = useState<CameraType>("back");
  const insets = useSafeAreaInsets();
  const cameraRef = useRef<CameraView>(null);

  const handleDetectionResults = (res: DeteksiResponse) => {
    if (res?.data?.total) {
      const total = res.data.total;
      const details = res.data.details;
      setDetectedAmount(total);
      speakDetectionResults(total, details);
    } else {
      setDetectedAmount(null);
      if (beepEnabled) {
        speakMessage("Uang tidak terdeteksi. Silakan coba lagi.");
      }
    }
  };

  const { mutate: DeteksiPhoto, isPending } = useDeteksi(
    handleDetectionResults
  );

  CameraPermission();

  const takePicture = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 1,
        base64: false,
        exif: false,
        skipProcessing: true,
      });

      if (!photo) {
        console.error("Failed to take picture");
        return;
      }

      console.log("Photo taken:", photo.uri);

      const formData = new FormData();
      formData.append("image", {
        uri: photo.uri,
        name: "money.jpg",
        type: "image/jpeg",
      } as any);

      await DeteksiPhoto({ photo: formData });
    } catch (error) {
      console.error("Error taking picture:", error);
    }
  };

  const toggleCameraType = () =>
    setFacing(facing === "back" ? "front" : "back");

  return (
    <View className="flex-1 bg-black">
      <View className="flex-[4]">
        <CameraView
          ref={cameraRef}
          style={{ flex: 1 }}
          facing={facing}
          flash={flashEnabled ? "on" : "off"}
        >
          <View className="absolute top-1/2 left-0 right-0 z-50 items-center -translate-y-1/2">
            {detectedAmount && (
              <Text className="text-white text-6xl font-bold">
                {detectedAmount}
              </Text>
            )}
          </View>
        </CameraView>
      </View>

      <View
        style={{ paddingBottom: insets.bottom + 10 }}
        className="absolute left-0 right-0 bottom-0 bg-white pt-6 px-4 h-[200px]"
      >
        <CameraActions
          isPending={isPending}
          onOpenSettings={() => setModalVisible(true)}
          onTakePicture={takePicture}
        />
      </View>

      <SettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        beepEnabled={beepEnabled}
        setBeepEnabled={setBeepEnabled}
        flashEnabled={flashEnabled}
        setFlashEnabled={setFlashEnabled}
        cameraType={facing}
        toggleCameraType={toggleCameraType}
      />
    </View>
  );
};

export default MoneyDetection;
