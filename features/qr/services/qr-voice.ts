import * as Speech from "expo-speech";

export function speak(text: string, lang: string = "id-ID") {
  if (!text) return;
  try {
    Speech.stop();
    Speech.speak(text, {
      language: lang,
      rate: 1.5,
      pitch: 1.0,
      volume: 1.0,
    });
  } catch (e) {
    console.warn("Speech error:", e);
  }
}

export function stopSpeak() {
  try {
    Speech.stop();
  } catch {}
}
