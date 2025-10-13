import { apiClient } from "@/lib/api/api-client";
import { getAccessToken } from "@/lib/sessions";
import { VoiceChatResponse } from "../types/voice";

export async function sendVoiceChat(
  audioUri: string
): Promise<VoiceChatResponse> {
  const token = await getAccessToken();

  const form = new FormData();
  form.append("audio", {
    uri: audioUri,
    name: "voice.m4a",
    type: "audio/m4a",
  } as any);

  const res = await apiClient<VoiceChatResponse>("/api/v1/voice/chat", "POST", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: form,
  });

  return res;
}

export async function sendVoiceChatControl(
  payload: any
): Promise<VoiceChatResponse> {
  const r = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/voice/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`sendVoiceChatControl failed: ${r.status}`);
  return r.json();
}
