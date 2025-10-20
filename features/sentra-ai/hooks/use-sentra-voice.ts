import * as Speech from "expo-speech";
import { useCallback, useMemo, useRef, useState } from "react";

type SpeakOpts = { interrupt?: boolean };

export function useSentraSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const stoppingRef = useRef<Promise<void> | null>(null);

  const SPEECH_OPTS = useMemo(
    () => ({
      language: "id-ID",
      rate: 3,
      pitch: 1,
      volume: 1.0,
    }),
    []
  );

  const stop = useCallback(async () => {
    if (stoppingRef.current) return stoppingRef.current;
    const p = (async () => {
      try {
        Speech.stop();
        await new Promise((r) => setTimeout(r, 30));
      } finally {
        stoppingRef.current = null;
        setIsSpeaking(false);
      }
    })();
    stoppingRef.current = p;
    return p;
  }, []);

  const speak = useCallback(
    async (text: string, opts: SpeakOpts = { interrupt: true }) => {
      if (opts.interrupt) {
        const speaking = await Speech.isSpeakingAsync();
        if (speaking) await stop();
      }
      return new Promise<void>((resolve) => {
        Speech.speak(text, {
          ...SPEECH_OPTS,
          onStart: () => setIsSpeaking(true),
          onDone: () => {
            setIsSpeaking(false);
            resolve();
          },
          onStopped: () => {
            setIsSpeaking(false);
            resolve();
          },
          onError: () => {
            setIsSpeaking(false);
            resolve();
          },
        });
      });
    },
    [SPEECH_OPTS, stop]
  );

  const toggle = useCallback(
    async (text: string) => {
      const speaking = await Speech.isSpeakingAsync();
      if (speaking) {
        await stop();
      } else {
        await speak(text, { interrupt: false });
      }
    },
    [speak, stop]
  );

  return { isSpeaking, speak, stop, toggle };
}
