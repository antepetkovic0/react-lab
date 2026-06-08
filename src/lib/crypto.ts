/**
 * Generates a cryptographically random base64url string.
 *
 * Uses `crypto.getRandomValues` for entropy, then encodes via {@link bytesToBase64Url}.
 * Output charset is `[A-Za-z0-9_-]`, a valid subset of the RFC 7636 code verifier
 * allowed characters (`[A-Z]/[a-z]/[0-9]/"-"/"."/"_"`).
 *
 * @param byteLength - Number of random bytes to generate before encoding.
 *   RFC 7636 recommends at least 32 bytes of entropy for a PKCE code verifier.
 * @returns A URL-safe base64url string.
 */
export function randomBase64Url(byteLength: number) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);

  return bytesToBase64Url(bytes);
}

/**
 * Hashes a string with SHA-256 and returns the digest as base64url.
 *
 * Produces `BASE64URL(SHA256(ASCII(value)))`, the code challenge format required
 * by OAuth PKCE when `code_challenge_method` is `S256` (RFC 7636).
 *
 * @param value - The plaintext to hash (typically a PKCE code verifier).
 * @returns A base64url-encoded SHA-256 digest, safe to pass as a URL query parameter.
 */
export async function sha256Base64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);

  return bytesToBase64Url(new Uint8Array(digest));
}

/**
 * Encodes bytes as base64url (RFC 4648 Section 5).
 *
 * Unlike standard base64 (`+`, `/`, `=`), base64url uses `-`, `_`, and no padding
 * so the result can appear in URLs without percent-encoding. Standard base64
 * characters are special in URLs (`+` = space, `/` = path separator, `=` = delimiter).
 *
 * @param bytes - Raw bytes to encode.
 * @returns A base64url string: `+` → `-`, `/` → `_`, padding removed.
 */
export function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}
