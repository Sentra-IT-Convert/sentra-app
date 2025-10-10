import { ProgressBar } from "@/features/home/components/progress-bar";
import { TransactionSummary } from "@/features/home/components/transaction-summary";
import { TABS } from "@/features/home/data/home";
import { useTransaction } from "@/features/home/hooks/use-transaction";
import { DateSelector } from "@/features/sentra-pay/components/date-selector";
import { useWallet } from "@/features/sentra-pay/hooks/use-wallet";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  ArrowLeft,
  ArrowUp,
  DollarSign,
  Eye,
  EyeOff,
  Plus,
  Smartphone,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {};

const SentraPay = (props: Props) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeMonth, setActiveMonth] = useState("Maret");
  const [selected, setSelected] = useState<string>(TABS[0]);
  const { data, isLoading, error } = useWallet();

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const transactions = [
    {
      id: 1,
      date: "31 Mar 2025",
      type: "QR Bayar",
      description: "Pembayaran QR ke LWSN_XXX_Soekarno Hatta 250606011122",
      amount: -51000,
      icon: "qr",
    },
    {
      id: 2,
      date: "31 Mar 2025",
      type: "Transfer Rupiah",
      description: "Transfer Dana Dari Sentra Pay JASON SURYA 085266994433",
      amount: 50000,
      icon: "transfer",
    },
  ];

  const { queryAll } = useTransaction();

  const totalIncome = calculateTotalIncome(queryAll.data?.transactions);
  const totalExpense = calculateTotalExpense(queryAll.data?.transactions);
  const progress =
    totalIncome + totalExpense
      ? (totalIncome / (totalIncome + totalExpense)) * 100
      : 0;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-primary-400 pt-12 pb-4">
        <View className="flex-row justify-between items-center rounded-b-lg px-4">
          <TouchableOpacity
            onPress={() => {
              router.replace("/(main)/home");
            }}
          >
            <ArrowLeft stroke="white" width={24} height={24} />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold">Sentra Pay</Text>
          <TouchableOpacity
            onPress={() => {
              router.push("/(sentra-pay)/notification");
            }}
            className="p-2 bg-[#DFF7E2] rounded-full"
          >
            <Ionicons name="notifications-outline" size={20} color="#093030" />
          </TouchableOpacity>
        </View>

        <View className="px-4 mt-2">
          <View className="border rounded-xl p-4 border-white/40">
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-base mr-1">Total Saldo</Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                {showBalance ? (
                  <Eye stroke="white" width={20} height={20} />
                ) : (
                  <EyeOff stroke="white" width={20} height={20} />
                )}
              </TouchableOpacity>
            </View>

            <Text className="text-white text-center text-3xl font-bold mt-1">
              Rp{showBalance ? `${data?.balance}` : "••••••••"}
            </Text>

            <View className="flex-row items-center justify-center mt-2 mb-4">
              <TransactionSummary
                totalIncome={totalIncome}
                totalExpense={totalExpense}
              />
            </View>
            <View>
              <ProgressBar
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                progress={progress}
              />
            </View>

            <View className="mb-2">
              <DateSelector selectedFilter={selected} />
            </View>
          </View>
        </View>
      </View>

      <View className="bg-white px-6 pt-4 flex-row justify-between">
        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center">
            <Plus stroke="#00027d" width={28} height={28} />
          </View>
          <Text className="text-sm mt-1 text-center">Top Up</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center">
            <ArrowUp stroke="#00027d" width={28} height={28} />
          </View>
          <Text className="text-sm mt-1 text-center">Transfer</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center">
            <DollarSign stroke="#00027d" width={28} height={28} />
          </View>
          <Text className="text-sm mt-1 text-center">Pinjaman</Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center">
            <Smartphone stroke="#00027d" width={24} height={24} />
          </View>
          <Text className="text-sm mt-1 text-center w-20">
            Pulsa/Paket data
          </Text>
        </TouchableOpacity>
      </View>

      <View className="px-4">
        <Text className="text-lg font-bold mb-2">Transaksi</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row justify-between mb-4 gap-x-2">
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                onPress={() => setActiveMonth(month)}
                className={`py-2 px-4 rounded-md ${
                  activeMonth === month ? "bg-primary-400" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`${
                    activeMonth === month ? "text-white" : "text-gray-600"
                  }`}
                >
                  {month}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {transactions.map((transaction) => (
            <View key={transaction.id} className="mb-4">
              <Text className="text-xs text-gray-500 mb-1">
                {transaction.date}
              </Text>
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-md items-center justify-center mr-3">
                  {transaction.icon === "qr" ? (
                    <View className="w-6 h-6 border-2 border-blue-900 rounded-sm items-center justify-center">
                      <View className="w-3 h-3 bg-blue-900" />
                    </View>
                  ) : (
                    <ArrowUp stroke="#1e40af" width={20} height={20} />
                  )}
                </View>
                <View className="flex-1 max-w-[60%]">
                  <Text className="font-bold">{transaction.type}</Text>
                  <Text className="text-xs text-gray-500">
                    {transaction.description}
                  </Text>
                </View>
                <Text
                  className={`font-bold ${
                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {transaction.amount < 0 ? "-" : "+"}Rp{" "}
                  {Math.abs(transaction.amount).toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SentraPay;

export const calculateTotalIncome = (transactions: any[]) => {
  return (
    transactions?.reduce(
      (acc, transaction) =>
        transaction.type === "income" ? acc + transaction.nominal : acc,
      0
    ) || 0
  );
};

export const calculateTotalExpense = (transactions: any[]) => {
  return (
    transactions?.reduce(
      (acc, transaction) =>
        transaction.type === "expense" ? acc + transaction.nominal : acc,
      0
    ) || 0
  );
};
