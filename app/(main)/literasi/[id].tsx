import { newsList } from "@/features/literasi/data/data";
import { useNewsDetail } from "@/features/literasi/hooks/use-news-details";
import SentraFAB from "@/features/sentra-ai/components/sentra-fab";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import * as Speech from "expo-speech";
import React, { useCallback, useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const FAB_SIZE = 56;
const VERTICAL_GAP = 16;
const BOTTOM_OFFSET = 24;

const NewsDetail = () => {
  const insets = useSafeAreaInsets();
  const tabBarH = useBottomTabBarHeight?.() ?? 0;
  const extraBottom =
    insets.bottom + tabBarH + FAB_SIZE + VERTICAL_GAP + BOTTOM_OFFSET;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const news = newsList[0];

  const SPEECH_OPTS = useMemo(
    () =>
      ({
        language: "id-ID",
        rate: 0.9,
        pitch: 0.95,
        volume: 1.0,
      }) as const,
    []
  );

  const {
    isPlaying,
    readingModeEnabled,
    highlightedParagraphs,
    toggleAudio,
    paragraphs,
  } = useNewsDetail(news, SPEECH_OPTS);

  const speakParagraph = useCallback(
    (text: string) => {
      Speech.stop();
      Speech.speak(text, SPEECH_OPTS);
    },
    [SPEECH_OPTS]
  );

  return (
    <SafeAreaView className="flex-1 bg-[#00027d]" edges={["top", "bottom"]}>
      <View className="px-4 pt-3 pb-4">
        <Text className="text-white font-bold text-xl leading-6 mb-2">
          {news.title}
        </Text>
        <View className="flex-row items-center">
          <View className="flex-row items-center mr-3">
            <Ionicons name="time" size={24} color="#fff" />
            <Text className="text-white text-base ml-1">{news.time}</Text>
          </View>
          <View className="px-2 py-1 rounded-full bg-[#E6E6F2] border border-[#B0B1D7]">
            <Text className="text-[#252525] text-xs">
              {news.category ?? "Keuangan"}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: 16,
            paddingHorizontal: 16,
            paddingBottom: Math.max(extraBottom, 24), // <-- hindari ketiban TabBar + FAB
          }}
          showsVerticalScrollIndicator={false}
        >
          <View className="bg-white rounded-xl p-3 mb-4 border border-gray-300">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <TouchableOpacity
                  onPress={toggleAudio}
                  className="w-12 h-12 rounded-full bg-primary-400 border border-gray-200 items-center justify-center mr-3"
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isPlaying ? "pause" : "play"}
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
                <View>
                  <Text className="text-[#252525] font-bold">
                    Audio Artikel
                  </Text>
                  <Text className="text-[#252525] text-xs">
                    Dengarkan narasi artikel ini
                  </Text>
                </View>
              </View>
              <TouchableOpacity className="ml-3" onPress={toggleAudio}>
                <Ionicons name="volume-high" size={24} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="bg-white border p-4 rounded-xl border-gray-200">
            <Text className="text-black text-base font-bold mb-3">
              Isi Artikel
            </Text>

            <View className="mb-4">
              {paragraphs.map((paragraph: string, index: number) => {
                const isActive = activeIndex === index;
                const isReadingHighlight =
                  readingModeEnabled && highlightedParagraphs.includes(index);

                const CARD_BG =
                  isActive || isReadingHighlight ? "#00027d" : "#FFFFFF";
                const CARD_BORD =
                  isActive || isReadingHighlight ? "#00027d" : "#E5E7EB";
                const TEXT_COL =
                  isActive || isReadingHighlight ? "#FFFFFF" : "#252525";
                const LINK_COL =
                  isActive || isReadingHighlight ? "#FFFFFF" : "#1E3A8A";
                const ICON_COL = LINK_COL;

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => setActiveIndex(isActive ? null : index)}
                    className="mb-3"
                  >
                    <View
                      className="rounded-2xl border"
                      style={{
                        backgroundColor: CARD_BG,
                        borderColor: CARD_BORD,
                      }}
                    >
                      <View className="flex-row p-4">
                        <View className="mr-3">
                          <View
                            className="px-3 py-2 rounded-lg border"
                            style={{
                              backgroundColor:
                                isActive || isReadingHighlight
                                  ? "#FFFFFF"
                                  : "#E6E6F2",
                              borderColor:
                                isActive || isReadingHighlight
                                  ? "#FFFFFF"
                                  : "#B0B1D7",
                            }}
                          >
                            <Text
                              className="text-xs font-semibold"
                              style={{
                                color:
                                  isActive || isReadingHighlight
                                    ? "#00027d"
                                    : "#3F3DB3",
                              }}
                            >
                              {index + 1}
                            </Text>
                          </View>
                        </View>

                        <View className="flex-1 px-4">
                          <Text
                            className="text-[14px] leading-6"
                            style={{ color: TEXT_COL, textAlign: "justify" }}
                          >
                            {paragraph.trim()}
                          </Text>

                          <TouchableOpacity
                            className="flex-row items-center mt-3"
                            activeOpacity={0.8}
                            onPress={() => speakParagraph(paragraph.trim())}
                          >
                            <Ionicons
                              name="volume-high"
                              size={18}
                              color={ICON_COL}
                            />
                            <Text
                              className="ml-2 text-[13px] font-medium"
                              style={{ color: LINK_COL }}
                            >
                              Dengarkan paragraf ini
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>

      <SentraFAB onPress={toggleAudio} bottomOffset={100} rightOffset={24} />
    </SafeAreaView>
  );
};

export default NewsDetail;
