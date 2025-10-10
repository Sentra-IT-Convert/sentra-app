export const DATE_OPTIONS = [
  { id: "today", label: "Hari Ini" },
  { id: "yesterday", label: "Kemarin" },
  { id: "thisWeek", label: "Minggu Ini" },
  { id: "lastWeek", label: "Minggu Kemarin" },
  { id: "thisMonth", label: "Bulan Ini" },
  { id: "lastMonth", label: "Bulan Lalu" },
  { id: "thisYear", label: "Tahun Ini" },
  { id: "lastYear", label: "Tahun Lalu" },
  { id: "7days", label: "7 Hari Terakhir" },
  { id: "30days", label: "30 Hari Terakhir" },
  { id: "90days", label: "90 Hari Terakhir" },
];

import {
  Feather,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export const TABS = ["Harian", "Mingguan", "Bulanan"];

export const transactions = [
  {
    id: "1",
    date: "Senin, 3/10",
    type: "Pendapatan",
    amount: "Rp3.000.000",
    category: "Gaji Bulanan",
    description: "Uang dari bos",
    icon: <MaterialIcons name="attach-money" size={24} color="white" />,
    color: "#00BE2C",
  },
  {
    id: "2",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "3",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "4",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "5",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
  {
    id: "6",
    date: "Senin, 3/10",
    type: "Pengeluaran",
    amount: "Rp10.000",
    category: "Gorengan dan Jajanan",
    description: "Beli jajanan risol",
    icon: <Ionicons name="fast-food-outline" size={24} color="white" />,
    color: "#FF0000",
  },
];

type IconProps = { color: string; size?: number };

export const expenseCategories = [
  {
    title: "Makanan",
    value: "makanan",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="bowl-food" size={size} color={color} />
    ),
  },
  {
    title: "Sehari-hari",
    value: "sehari-hari",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="cart-shopping" size={size} color={color} />
    ),
  },
  {
    title: "Transportasi",
    value: "transportasi",
    icon: ({ color, size = 24 }: IconProps) => (
      <MaterialIcons name="commute" size={size} color={color} />
    ),
  },
  {
    title: "Sosial",
    value: "sosial",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="users" size={size} color={color} />
    ),
  },
  {
    title: "Perumahan",
    value: "perumahan",
    icon: ({ color, size = 24 }: IconProps) => (
      <Feather name="home" size={size} color={color} />
    ),
  },
  {
    title: "Hadiah",
    value: "hadiah",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="gift" size={size} color={color} />
    ),
  },
  {
    title: "Komunikasi",
    value: "komunikasi",
    icon: ({ color, size = 24 }: IconProps) => (
      <Feather name="message-square" size={size} color={color} />
    ),
  },
  {
    title: "Pakaian",
    value: "pakaian",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="shirt" size={size} color={color} />
    ),
  },
  {
    title: "Hiburan",
    value: "hiburan",
    icon: ({ color, size = 24 }: IconProps) => (
      <Ionicons name="tv" size={size} color={color} />
    ),
  },
  {
    title: "Tampilan",
    value: "tampilan",
    icon: ({ color, size = 24 }: IconProps) => (
      <MaterialCommunityIcons name="mirror" size={size} color={color} />
    ),
  },
  {
    title: "Kesehatan",
    value: "kesehatan",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="heart-pulse" size={size} color={color} />
    ),
  },
  {
    title: "Pajak",
    value: "pajak",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="file-invoice-dollar" size={size} color={color} />
    ),
  },
  {
    title: "Pendidikan",
    value: "pendidikan",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="graduation-cap" size={size} color={color} />
    ),
  },
  {
    title: "Investasi",
    value: "investasi",
    icon: ({ color, size = 24 }: IconProps) => (
      <Feather name="trending-up" size={size} color={color} />
    ),
  },
  {
    title: "Peliharaan",
    value: "peliharaan",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="paw" size={size} color={color} />
    ),
  },
  {
    title: "Liburan",
    value: "liburan",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="umbrella-beach" size={size} color={color} />
    ),
  },
];

export const incomeCategories = [
  {
    title: "Gaji",
    value: "gaji",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="money-bill" size={size} color={color} />
    ),
  },
  {
    title: "Bonus",
    value: "bonus",
    icon: ({ color, size = 24 }: IconProps) => (
      <FontAwesome6 name="money-check-dollar" size={size} color={color} />
    ),
  },
  {
    title: "Investasi",
    value: "investasi",
    icon: ({ color, size = 24 }: IconProps) => (
      <Feather name="trending-up" size={size} color={color} />
    ),
  },
  {
    title: "Part Time",
    value: "part time",
    icon: ({ color, size = 24 }: IconProps) => (
      <MaterialIcons name="work-outline" size={size} color={color} />
    ),
  },
];

export type CategoryOption = {
  title: string;
  value: string;
  icon: (p: IconProps) => React.ReactNode;
};

export const incomeCategoryMap: Record<string, CategoryOption> =
  Object.fromEntries(
    (incomeCategories as CategoryOption[]).map((c) => [c.value, c])
  );

export const expenseCategoryMap: Record<string, CategoryOption> =
  Object.fromEntries(
    (expenseCategories as CategoryOption[]).map((c) => [c.value, c])
  );
