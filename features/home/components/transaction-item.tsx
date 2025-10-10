import {
  formatRupiah,
  formatTransactionDate,
  getCategoryIcon,
} from "@/lib/utils";
import React from "react";
import { Text, View } from "react-native";

export function TransactionItem({ transaction }: { transaction: any }) {
  const icon = getCategoryIcon(transaction.category, transaction.type);
  const typeLabel = transaction.type === "income" ? "Pemasukan" : "Pengeluaran";
  return (
    <View className="bg-gray-100 rounded-2xl mb-4 mx-1">
      <View className="rounded-lg bg-primary-200 flex-row items-center justify-between py-2 px-3">
        <View className="flex-row gap-x-2 items-center">
          <Text className="text-xs">
            {formatTransactionDate(transaction.created_at)}
          </Text>
          <Text className="text-xs text-black">{transaction.date}</Text>
        </View>
        <Text className="text-black text-center font-normal text-xs">
          {typeLabel}: {formatRupiah(transaction.nominal)}
        </Text>
      </View>
      <View className="p-3">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-x-2">
            <View className="border rounded-lg bg-primary-400 p-2">
              {icon && icon({ color: "#fff", size: 24 })}
            </View>
            <View className="flex-col gap-y-1">
              <Text className="text-sm font-bold">{transaction.category}</Text>
              <Text className="text-xs text-gray-500">
                {transaction.description}
              </Text>
            </View>
          </View>
          <Text
            className={`font-bold text-lg ${
              transaction.type === "income" ? "text-[#00BE2C]" : "text-[#F00]"
            }`}
          >
            {transaction.type === "income" ? "+" : "-"}
            {formatRupiah(transaction.nominal)}
          </Text>
        </View>
      </View>
    </View>
  );
}
