const B64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const LUT = new Uint8Array(256);
for (let i = 0; i < B64.length; i++) LUT[B64.charCodeAt(i)] = i;

export function base64ToUint8Array(b64: string) {
  b64 = b64.replace(/[^A-Za-z0-9+/=]/g, "");
  const len = b64.length;
  const pad = b64.endsWith("==") ? 2 : b64.endsWith("=") ? 1 : 0;
  const bytesLen = ((len * 3) >> 2) - pad;
  const out = new Uint8Array(bytesLen);

  let p = 0,
    j = 0;
  while (p < len) {
    const a = LUT[b64.charCodeAt(p++)] | 0;
    const b = LUT[b64.charCodeAt(p++)] | 0;
    const c = LUT[b64.charCodeAt(p++)] | 0;
    const d = LUT[b64.charCodeAt(p++)] | 0;

    out[j++] = (a << 2) | (b >> 4);
    if (j < bytesLen) out[j++] = ((b & 15) << 4) | (c >> 2);
    if (j < bytesLen) out[j++] = ((c & 3) << 6) | d;
  }
  return out;
}
