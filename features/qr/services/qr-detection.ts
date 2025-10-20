export const WS_BASE = process.env.EXPO_PUBLIC_API_WEBSOCKET;

export function getQrisWsUrl() {
  return `${WS_BASE}/api/v1/qris/ws`;
}

export type QrisMessage =
  | {
      type: "qris";
      payload: {
        rawText: string;
        merchant?: string;
        amount?: number;
        [k: string]: any;
      };
      ts?: string | number;
    }
  | { type: "hello" | "ping" | "pong" | "error" | string; [k: string]: any };
