import { useEffect, useRef, useState } from "react";
import { speakText, SpeechOpts, stopSpeech } from "../actions/speech";

export const useNewsDetail = (news: any, speechOptions?: SpeechOpts) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [readingModeEnabled, setReadingModeEnabled] = useState(false);
  const [highlightedParagraphs, setHighlightedParagraphs] = useState<number[]>(
    []
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastReadIndex, setLastReadIndex] = useState<number | null>(null);

  const speechQueueRef = useRef<string[]>([]);
  const isSpeakingRef = useRef(false);
  const currentTextRef = useRef("");

  const paragraphs = news.content
    .split("\n")
    .filter((para: string) => para.trim() !== "");

  const processQueue = () => {
    if (speechQueueRef.current.length > 0 && !isSpeakingRef.current) {
      const nextText = speechQueueRef.current[0];
      isSpeakingRef.current = true;
      currentTextRef.current = nextText;

      speakText(nextText, handleDone, handleStopped, speechOptions);
    }
  };

  const handleDone = () => {
    const currentIndex = paragraphs.findIndex(
      (p: string) => p === currentTextRef.current
    );
    setLastReadIndex(currentIndex);
    speechQueueRef.current.shift();
    isSpeakingRef.current = false;

    if (speechQueueRef.current.length > 0) {
      processQueue();
    } else {
      setIsPlaying(false);
    }
  };

  const handleStopped = () => {
    isSpeakingRef.current = false;
  };

  const triggerSpeech = (text: string) => {
    stopSpeech();
    isSpeakingRef.current = false;
    speechQueueRef.current = [text];
    processQueue();
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSpeech();
      speechQueueRef.current = [];
      isSpeakingRef.current = false;
      setLastReadIndex(null);
      setIsPlaying(false);
    } else {
      const textsToRead =
        highlightedParagraphs.length > 0
          ? highlightedParagraphs.map((i) => paragraphs[i]).join(" ")
          : news.content;

      triggerSpeech(textsToRead);
      setIsPlaying(true);
    }
  };

  const handleToggleReadingMode = (value: boolean) => {
    setReadingModeEnabled(value);
    if (!value) {
      setHighlightedParagraphs([]);
      stopSpeech();
      speechQueueRef.current = [];
      isSpeakingRef.current = false;
      setLastReadIndex(null);
      setIsPlaying(false);
    }
  };

  const toggleHighlight = (index: number) => {
    if (!readingModeEnabled || isProcessing) return;

    setIsProcessing(true);
    setHighlightedParagraphs((prev) => {
      const updated = prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index].sort((a, b) => a - b);

      if (isPlaying) {
        const sorted = updated;
        const startIndex =
          lastReadIndex !== null
            ? sorted.findIndex((i) => i > lastReadIndex)
            : 0;
        const remaining = sorted
          .slice(startIndex)
          .map((i) => paragraphs[i])
          .join(" ");
        triggerSpeech(remaining);
      }

      setTimeout(() => setIsProcessing(false), 200);
      return updated;
    });
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  return {
    isPlaying,
    readingModeEnabled,
    highlightedParagraphs,
    toggleAudio,
    handleToggleReadingMode,
    toggleHighlight,
    lastReadIndex,
    paragraphs,
  };
};
