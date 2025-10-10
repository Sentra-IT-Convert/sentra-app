import { apiClient } from "@/lib/api/api-client";
import { getAccessToken } from "@/lib/sessions";
import { VoiceChatResponse, VoiceCommandResponse } from "../types/voice";

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

export async function sendVoiceCommand(
  audioUri: string
): Promise<VoiceCommandResponse> {
  const token = await getAccessToken();

  const form = new FormData();
  form.append("audio", {
    uri: audioUri,
    name: "voice.m4a",
    type: "audio/m4a",
  } as any);

  return apiClient<VoiceCommandResponse>("/api/v1/voice/command", "POST", {
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
}
