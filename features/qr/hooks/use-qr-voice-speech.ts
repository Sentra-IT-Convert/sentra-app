import { useRef } from "react";
import { speak, stopSpeak } from "../services/qr-voice";

export function useSpeech() {
  const lastKey = useRef<string | null>(null);
  const lastTime = useRef<number>(0);

  const say = (text: string, cooldown = 2000) => {
    const now = Date.now();
    if (lastKey.current === text && now - lastTime.current < cooldown) return;
    lastKey.current = text;
    lastTime.current = now;
    speak(text);
  };

  return { say, stopSpeak };
}
