import { Loading } from "@/components/loading";
import ExpenseModal from "@/features/home/components/expense-modal";
import { FiltersTab } from "@/features/home/components/filter-tab";
import { Header } from "@/features/home/components/header";
import IncomeModal from "@/features/home/components/income-modal";
import { ProgressBar } from "@/features/home/components/progress-bar";
import { TransactionItem } from "@/features/home/components/transaction-item";
import { TransactionMenu } from "@/features/home/components/transaction-menu";
import { TransactionSummary } from "@/features/home/components/transaction-summary";
import VoiceAssistantButton from "@/features/home/components/voice-assistant-button";
import { TABS } from "@/features/home/data/home";
import { useTransaction } from "@/features/home/hooks/use-transaction";
import { buildTransactionSpeech } from "@/features/sentra-ai/utils/voice";
import { useRouter } from "expo-router";
import * as Speech from "expo-speech";
import React, { useCallback, useState } from "react";
import { FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(TABS[0]);
  const [itemsModalVisible, setItemsModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [showIncome, setShowIncome] = useState(false);
  const [showExpense, setShowExpense] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const { queryAll } = useTransaction();

  const toggleItemsModal = useCallback(() => {
    setItemsModalVisible((prev) => !prev);
  }, []);

  const totalIncome = calculateTotalIncome(queryAll.data?.transactions);
  const totalExpense = calculateTotalExpense(queryAll.data?.transactions);
  const totalBalance = totalIncome - totalExpense;

  const totalAmount = totalIncome + totalExpense;
  const progress = totalAmount ? (totalIncome / totalAmount) * 100 : 0;

  const speakOrStop = (text: string) => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }
    Speech.speak(text, {
      ...SPEECH_OPTS,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
    setIsSpeaking(true);
  };

  const handleAssistantGuide = () => {
    const msg = `
Halo, ini Sentra AI. 
Tekan tombol, bicara, lalu lepas.
Untuk pindah halaman, ucapkan: Buka [nama menu]. Contoh: Buka Deteksi atau Beranda.
Untuk menambah pemasukan, ucapkan: Tambah pemasukan [nominal] [deskripsi].
Untuk menambah pengeluaran, ucapkan: Tambah pengeluaran [nominal] [deskripsi]. 
Kategori bisa: Makanan, Transportasi, Belanja, Kesehatan, Hiburan, Tagihan, atau Lainnya.
Untuk menghapus transaksi, ucapkan: Hapus transaksi [nominal] [deskripsi].
Untuk ringkasan, ucapkan: Ringkas bulan ini.
Untuk profil, ucapkan: Buka Edit Profil, Buka Contact Person, atau Logout.
Jika salah format, saya akan memberitahu cara ucapan yang benar.
`;
    speakOrStop(msg);
  };

  const handleTransactionSummary = () => {
    const msg = `Saldo saat ini ${rp(
      totalBalance
    )} rupiah, total pemasukan bulan ini ${rp(
      totalIncome
    )} rupiah, total pengeluaran ${rp(totalExpense)} rupiah`;
    speakOrStop(msg);
  };

  const handleTransactionPress = useCallback(
    (item: any) => {
      const msg = buildTransactionSpeech(item);

      speakOrStop(msg);

      if (item && item.category) {
        setSelectedTransaction(item);
        toggleItemsModal();
      }
    },
    [toggleItemsModal, isSpeaking]
  );

  return (
    <SafeAreaView className="h-full w-full bg-primary-400">
      <View className="px-4 pt-2 pb-2 leading-6 flex-col">
        <Header />
        <View className="mt-4">
          <TouchableOpacity
            onPress={() => router.push("/(sentra-pay)/sentra-pay")}
          >
            <View className="flex flex-col items-start border border-white/40 p-2 rounded-xl">
              <TransactionSummary
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />
              <ProgressBar
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                progress={progress}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-xl w-full h-full mt-4 flex-1">
        <View className="mx-6 mt-3">
          <VoiceAssistantButton onPress={handleAssistantGuide} />
        </View>

        <View className="mx-6">
          <TransactionMenu
            features={[
              {
                label: "Pemasukan",
                color: "green",
                icon: "plus",
                onPress: () => setShowIncome(true),
              },
              {
                label: "Pengeluaran",
                color: "red",
                icon: "plus",
                onPress: () => setShowExpense(true),
              },
              {
                label: "Ringkasan",
                color: "indigo",
                icon: "chart-line",
                onPress: handleTransactionSummary,
              },
            ]}
          />
        </View>

        <View className="mx-6 mt-3">
          <FiltersTab selected={selected} setSelected={setSelected} />
        </View>

        {queryAll.isLoading ? (
          <View className="flex-1 justify-center items-center">
            <Loading />
          </View>
        ) : queryAll.error ? (
          <View className="flex-1 justify-center items-center">
            <Text>
              {(queryAll.error as any).message || "Error loading transactions"}
            </Text>
          </View>
        ) : (
          <FlatList
            data={queryAll.data?.transactions || []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => handleTransactionPress(item)}
              >
                <TransactionItem transaction={item} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ padding: 16, paddingBottom: 70 }}
            ListEmptyComponent={
              <View className="flex-1 justify-center items-center">
                <Text>No transactions found</Text>
              </View>
            }
          />
        )}
      </View>

      <IncomeModal visible={showIncome} onClose={() => setShowIncome(false)} />
      <ExpenseModal
        visible={showExpense}
        onClose={() => setShowExpense(false)}
      />
    </SafeAreaView>
  );
}

const SPEECH_OPTS = {
  language: "id-ID",
  rate: Platform.select({
    ios: 0.45,
    android: 0.9,
    default: 0.7,
  }),
  pitch: 0.95,
  volume: 1.0,
} as const;

const calculateTotalIncome = (transactions: any[]) =>
  transactions?.reduce(
    (acc: number, t: any) => (t.type === "income" ? acc + t.nominal : acc),
    0
  ) || 0;

const calculateTotalExpense = (transactions: any[]) =>
  transactions?.reduce(
    (acc: number, t: any) => (t.type === "expense" ? acc + t.nominal : acc),
    0
  ) || 0;

const rp = (n: number) => new Intl.NumberFormat("id-ID").format(n);
