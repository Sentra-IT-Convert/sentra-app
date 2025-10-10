export type VoiceChatResponse = {
  text: string;
  transcript?: string;
  action?: "transaction" | "navigate" | "fill_note" | "unknown";
  success: boolean;
  confidence?: number;
  audio_url?: string;
  metadata?: {
    transaction_type?: "income" | "expense";
    transaction_amount?: number;
    transaction_category?: string;
    note?: string;
    page?: string;
  };
  target?: string;
};

export type AddTxPayload = {
  type: "pemasukan" | "pengeluaran";
  amount: number;
  category?: string;
  note?: string;
};

export type VoiceCommandResponse = {
  text: string;
  transcript?: string;
  action?: "navigate" | "unknown";
  success: boolean;
  confidence?: number;
  audio_url?: string;
  metadata?: {
    page?: string;
  };
};
