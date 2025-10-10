import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  isPending: boolean;
  onOpenSettings: () => void;
  onTakePicture: () => void;
};

export default function CameraActions({
  isPending,
  onOpenSettings,
  onTakePicture,
}: Props) {
  return (
    <View className="flex-row gap-x-3 w-full">
      <TouchableOpacity
        className="bg-primary-400 p-5 flex-1 rounded-md"
        onPress={onOpenSettings}
      >
        <Text className="text-white font-bold text-center">PENGATURAN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`${isPending ? "bg-gray-400 opacity-70" : "bg-primary-400"} p-5 flex-1 rounded-md`}
        onPress={onTakePicture}
        disabled={isPending}
      >
        <Text className="text-white font-bold text-center">
          {isPending ? "Memproses..." : "AMBIL FOTO"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
