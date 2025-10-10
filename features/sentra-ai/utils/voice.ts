import { formatRupiah } from "@/lib/utils";
import type { Href } from "expo-router";

export type PageKey =
  | "home"
  | "beranda"
  | "deteksi"
  | "money-detection"
  | "literasi"
  | "profil"
  | "profiles"
  | "edit-email"
  | "edit-phone"
  | "edit-profile"
  | "verif-email"
  | "verif-hp"
  | "qr"
  | "scan-qr"
  | "show-qr"
  | "pin-qr"
  | "sentra-pay"
  | "notification";

export const routeMap: Record<string, Href> = {
  home: "/home",
  beranda: "/home",

  deteksi: "/deteksi",
  "money-detection": "/deteksi/money-detection",

  literasi: "/literasi",
  profiles: "/profiles",
  profil: "/profiles",

  "edit-email": "/profiles/edit-email",
  "edit-phone": "/profiles/edit-phone",
  "edit-profile": "/profiles/edit-profile",
  "verif-email": "/profiles/verification-email",
  "verif-hp": "/profiles/verification-hp",

  qr: "/qr",
  "scan-qr": "/qrCode/scan-qr",
  "show-qr": "/qrCode/show-qr",
  "pin-qr": "/qrCode/pin-qr",

  "sentra-pay": "/sentra-pay",
  notification: "/notification",
};

export function resolveSpokenPage(raw?: string): Href | null {
  if (!raw) return null;

  let s = raw.toLowerCase();
  s = s.replace(/[.,!?;:()'"`~]/g, " ");
  const STOP = [
    "tolong",
    "mohon",
    "buka",
    "bukain",
    "ke",
    "menu",
    "halaman",
    "page",
    "mau",
    "saya",
    "aku",
    "dong",
    "ya",
    "kak",
  ];
  for (const w of STOP) s = s.replace(new RegExp(`\\b${w}\\b`, "g"), " ");
  s = s.replace(/\s+/g, " ").trim();

  type Syn = { keys: string[]; page: PageKey };
  const SYNONYMS: Syn[] = [
    { keys: ["beranda", "home"], page: "home" },

    {
      keys: ["deteksi uang", "money detection", "money-detection"],
      page: "money-detection",
    },
    { keys: ["deteksi"], page: "deteksi" },

    { keys: ["literasi"], page: "literasi" },

    {
      keys: ["profil", "profile", "profiles", "akun", "account"],
      page: "profiles",
    },

    { keys: ["edit email"], page: "edit-email" },
    { keys: ["edit nomor", "edit hp", "edit phone"], page: "edit-phone" },
    { keys: ["edit profil"], page: "edit-profile" },

    { keys: ["verifikasi email"], page: "verif-email" },
    { keys: ["verifikasi hp", "verifikasi nomor", "otp hp"], page: "verif-hp" },

    { keys: ["qris", "qr is"], page: "qr" },
    { keys: ["scan qr", "pindai qr"], page: "scan-qr" },
    {
      keys: ["tampilkan qr", "lihat qr", "kode qr", "show qr"],
      page: "show-qr",
    },
    { keys: ["pin qr", "set pin qr"], page: "pin-qr" },

    {
      keys: ["sentra pay", "sentrapay", "wallet", "dompet"],
      page: "sentra-pay",
    },

    {
      keys: ["notifikasi", "notif", "notifications", "notification"],
      page: "notification",
    },
  ];

  for (const { keys, page } of SYNONYMS) {
    if (keys.some((k) => s.includes(k))) {
      const href = routeMap[page];
      return href ?? null;
    }
  }

  const asKey = s as PageKey;
  const direct = routeMap[asKey];
  if (direct) return direct;

  return null;
}

export function buildTransactionSpeech(t: any): string {
  const jenis = t.type === "income" ? "Pemasukan" : "Pengeluaran";
  const nominal = formatRupiah(t.nominal);
  const kategori = t.category || "tidak diketahui";
  const deskripsi = t.description || t.title || "tanpa deskripsi";
  const tanggal = new Date(t.created_at).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return `${jenis} sebesar ${nominal} rupiah, kategori ${kategori}, untuk ${deskripsi}, pada tanggal ${tanggal}.`;
}

export function normalizeTarget(raw?: string | Href | null): Href | null {
  if (!raw) return null;
  let t = String(raw).trim().toLowerCase();

  t = t.replace(/\s+/g, " ").trim();
  if (!t.startsWith("/")) t = `/${t}`;
  t = t.replace(/\/{2,}/g, "/");

  const ALIAS: Record<string, string> = {
    "/": "/home",
    "/beranda": "/home",

    "/profile": "/profiles",
    profile: "/profiles",
    profiles: "/profiles",
    "/profil": "/profiles",

    "/notifications": "/notification",
    notifications: "/notification",

    deteksi: "/deteksi",
  };

  t = ALIAS[t] ?? t;
  return t as Href;
}
