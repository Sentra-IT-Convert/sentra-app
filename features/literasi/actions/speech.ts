import * as Speech from "expo-speech";

export type SpeechOpts = Speech.SpeechOptions & {
  rate?: number;
  pitch?: number;
  volume?: number;
};

export const speakText = (
  text: string,
  onDone?: () => void,
  onStopped?: () => void,
  options?: SpeechOpts
) => {
  Speech.stop();
  Speech.speak(text, {
    ...(options ?? {}),
    onDone,
    onStopped,
  });
};

export const stopSpeech = () => {
  Speech.stop();
};
