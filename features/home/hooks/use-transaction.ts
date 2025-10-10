import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  getTransactionsById,
  getTransactionsByPeriodMonth,
  getTransactionsByPeriodWeek,
  getTransactionsByTypeAndCategory,
  updateTransaction,
} from "../services/transaction";
import { Transaction } from "../types/home";

// ✅ fungsi helper biar reusable
const isTransactionQuery = (q: any) =>
  Array.isArray(q.queryKey) && q.queryKey[0] === "transactions";

export const useTransaction = () => {
  const queryClient = useQueryClient();

  // 🔁 query-query
  const queryAll = useQuery<any>({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    refetchOnMount: "always",
  });

  const queryById = (id: string) =>
    useQuery<Transaction>({
      queryKey: ["transaction", id],
      queryFn: () => getTransactionsById(id),
      enabled: !!id,
    });

  const queryByMonth = (month: string) =>
    useQuery<Transaction>({
      queryKey: ["transactions", "month", month],
      queryFn: () => getTransactionsByPeriodMonth(month),
      enabled: !!month,
    });

  const queryByWeek = (week: string) =>
    useQuery<Transaction>({
      queryKey: ["transactions", "week", week],
      queryFn: () => getTransactionsByPeriodWeek(week),
      enabled: !!week,
    });

  const queryByTypeAndCategory = (type: string, category: string) =>
    useQuery<Transaction>({
      queryKey: ["transactions", "filter", type, category],
      queryFn: () => getTransactionsByTypeAndCategory(type, category),
      enabled: !!type && !!category,
    });

  // 🔧 helper untuk invalidate + refetch semua variasi transaksi
  async function refreshTransactions() {
    await queryClient.invalidateQueries({ predicate: isTransactionQuery });
    await queryClient.refetchQueries({
      predicate: isTransactionQuery,
      type: "all", // refetch semua, termasuk yang non-active
    });
  }

  // 💰 CREATE
  const mutationCreate = useMutation<any, Error, FormData>({
    mutationFn: (data) => createTransaction(data),
    onSuccess: async () => {
      await refreshTransactions();
    },
  });

  // ✏️ UPDATE
  const mutationUpdate = useMutation({
    mutationFn: updateTransaction,
    onSuccess: async () => {
      await refreshTransactions();
    },
  });

  // ❌ DELETE
  const mutationDelete = useMutation({
    mutationFn: deleteTransaction,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ predicate: isTransactionQuery });

      const previousData = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData<Transaction[]>(["transactions"], (old) =>
        old?.filter((tx) => tx.id !== id)
      );

      return { previousData };
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(["transactions"], context?.previousData);
    },
    onSettled: async () => {
      await refreshTransactions();
    },
  });

  const refetchAll = refreshTransactions;

  const prefetchAll = () =>
    queryClient.prefetchQuery({
      queryKey: ["transactions"],
      queryFn: getTransactions,
    });

  return {
    queryAll,
    queryById,
    queryByMonth,
    queryByWeek,
    queryByTypeAndCategory,
    mutationCreate,
    mutationUpdate,
    mutationDelete,
    refetchAll,
    prefetchAll,
  };
};
