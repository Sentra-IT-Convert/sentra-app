"use client";

import { literasiActions } from "@/features/literasi/actions/literasi";
import NewsCard from "@/features/literasi/components/news-card";
import SearchInput from "@/features/literasi/components/search-input";
import { newsList } from "@/features/literasi/data/data";
import { useLiterasi } from "@/features/literasi/hooks/use-literasi";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Literasi = () => {
  const {
    search,
    setSearch,
    otherNews,
    handleSpeak,
    handleSearch,
    handleVoice,
  } = useLiterasi(newsList);

  const { handleNewsPress } = literasiActions();

  return (
    <SafeAreaView className="flex-1 bg-primary-400">
      <View className="flex-row items-center justify-between pt-4 mx-6 py-2">
        <Text className="text-white text-xl font-bold">Literasi Keuangan</Text>
        <AntDesign name="customer-service" size={24} color="white" />
      </View>

      <View className="bg-white flex-1 rounded-t-2xl mt-2 px-4 pt-4">
        <FlatList
          ListHeaderComponent={
            <>
              <View className="flex-row justify-center items-center mb-2">
                <SearchInput
                  value={search}
                  onChangeText={setSearch}
                  onSearchPress={handleSearch}
                  onVoicePress={handleVoice}
                  placeholder="Ketik kata kunci..."
                />
              </View>
            </>
          }
          data={otherNews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleNewsPress(item.id)}>
              <NewsCard
                icon={item.icon}
                title={item.title}
                category={item.category}
                time={item.time}
                onPressAudio={() => handleSpeak(item.title)}
              />
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Literasi;
