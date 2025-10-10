import { formatRupiah } from "@/lib/utils";
import { Text, View } from "react-native";

export function TransactionSummary({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  return (
    <View className="w-full p-3">
      <Text className="text-white mb-4">Saldo saat ini</Text>
      <View className="flex-row items-baseline justify-between">
        <Text
          className="text-white font-extrabold text-3xl flex-1"
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {formatRupiah(totalIncome - totalExpense)}
        </Text>

        <Text className="text-white/80 text-base ml-3 shrink-0">Bulan Ini</Text>
      </View>
    </View>
  );
}
