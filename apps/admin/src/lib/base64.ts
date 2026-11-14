/**
 * The GitHub Contents API moves file bodies as base64. `btoa`/`atob` only
 * handle Latin1, so UTF-8 text (café names, accents) needs an explicit byte
 * round-trip through TextEncoder/TextDecoder.
 */

export function utf8ToBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

export function base64ToUtf8(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ''));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
