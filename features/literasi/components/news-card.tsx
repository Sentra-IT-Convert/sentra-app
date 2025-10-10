import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  icon: string;
  iconBg?: string;
  title: string;
  category: string;
  time: string;
  onPressAudio?: () => void;
};

const NewsCard = ({
  icon,
  iconBg = "#EEF2FF",
  title,
  category,
  time,
  onPressAudio,
}: Props) => {
  return (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100">
      <View className="flex-row items-start">
        <View
          className="w-12 h-12 rounded-lg justify-center items-center mr-4"
          style={{ backgroundColor: iconBg }}
        >
          <MaterialCommunityIcons
            name={icon as any}
            size={24}
            color="#00027d"
          />
        </View>

        <View className="flex-1">
          <Text
            className="text-black font-bold text-base mb-2"
            numberOfLines={2}
          >
            {title}
          </Text>

          <View className="flex-row items-center flex-wrap gap-2">
            <View className="px-2.5 py-1.5 rounded-full border border-[#B0B1D7] bg-[#E6E6F2]">
              <Text className="text-xs text-black">{category}</Text>
            </View>

            <View className="flex-row items-center ml-2">
              <Ionicons name="time" size={14} color="#00027d" />
              <Text className="ml-1 text-xs text-black">{time}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity className="ml-2 p-2" onPress={onPressAudio}>
          <Ionicons name="volume-high" size={22} color="#00027d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewsCard;
