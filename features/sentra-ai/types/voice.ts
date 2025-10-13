export type VoiceChatResponse = {
  text: string;
  transcript?: string;
  action?:
    | "transaction"
    | "navigate"
    | "delete_transaction"
    | "query"
    | "logout";
  success: boolean;
  confidence?: number;
  audio_url?: string;
  metadata?: {
    transaction_id?: string;
    transaction_type?: "income" | "expense";
    transaction_amount?: number;
    transaction_category?: string;
    note?: string;
    page?: string;
  };
  target?: string;
  session_state?: VoiceSessionState;
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

export type PendingTx = {
  id: string;
  amount: number;
  title?: string;
  note?: string;
  datetime?: string;
};

export type VoiceSessionState = {
  pending_confirmation?: boolean;
  context?: {
    step?: string;
    pending_delete_transactions?: PendingTx[];
    current_delete_index?: number;
    conversation_history?: unknown[];
  };
};
