import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getQrisWsUrl, QrisMessage } from "../services/qr-detection";

type UseQrisWSOpts = {
  pingIntervalMs?: number;
  maxBackoffMs?: number;
};

export function useQrisWS(opts?: UseQrisWSOpts) {
  const { pingIntervalMs = 0, maxBackoffMs = 10_000 } = opts ?? {};

  const url = useMemo(() => getQrisWsUrl(), []);
  const wsRef = useRef<WebSocket | null>(null);
  const connectingRef = useRef(false);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<QrisMessage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const backoff = useRef(1000);
  const reconnectTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pingTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = () => {
    if (reconnectTimer.current) clearTimeout(reconnectTimer.current);
    if (pingTimer.current) clearInterval(pingTimer.current);
    reconnectTimer.current = null;
    pingTimer.current = null;
  };

  const closeWS = () => {
    if (wsRef.current) {
      try {
        wsRef.current.close();
      } catch {}
      wsRef.current = null;
    }
    connectingRef.current = false;
  };

  const scheduleReconnect = useCallback(
    (why = "") => {
      clearTimers();
      const delay = Math.min(backoff.current, maxBackoffMs);
      console.log(`⟳ Reconnecting in ${delay}ms ${why ? `(${why})` : ""}`);
      reconnectTimer.current = setTimeout(() => {
        backoff.current = Math.min(backoff.current * 2, maxBackoffMs);
        connect();
      }, delay);
    },
    [maxBackoffMs]
  );

  const connect = useCallback(() => {
    if (connectingRef.current || wsRef.current) return;
    connectingRef.current = true;

    clearTimers();
    closeWS();
    setConnected(false);

    console.log("🔌 Connecting to:", url);
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WS open");
      setConnected(true);
      setError(null);
      backoff.current = 1000;
      connectingRef.current = false;

      if (pingIntervalMs > 0) {
        pingTimer.current = setInterval(() => {
          try {
            ws.send(JSON.stringify({ type: "ping", ts: Date.now() }));
          } catch {}
        }, pingIntervalMs);
      }
    };

    ws.onmessage = (e) => {
      console.log("📩 WS message:", e.data);
      try {
        const msg = JSON.parse(e.data);
        setLastMessage(msg);
      } catch {
        setLastMessage({ type: "raw", raw: String(e.data) } as any);
      }
    };

    ws.onerror = (ev: any) => {
      console.log("⚠️ WS error:", ev?.message ?? ev);
      setError("WebSocket error");
    };

    ws.onclose = (ev) => {
      console.log(`❌ WS closed: code=${ev.code} reason=${ev.reason}`);
      setConnected(false);
      clearTimers();
      connectingRef.current = false;
      scheduleReconnect(`code=${ev.code}`);
    };
  }, [pingIntervalMs, scheduleReconnect, url]);

  useEffect(() => {
    connect();
    return () => {
      clearTimers();
      closeWS();
    };
  }, [connect]);

  const sendBinary = useCallback((bytes: Uint8Array) => {
    if (!wsRef.current || wsRef.current.readyState !== 1) return false;
    try {
      wsRef.current.send(bytes.buffer);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { connected, lastMessage, error, sendBinary, url };
}
