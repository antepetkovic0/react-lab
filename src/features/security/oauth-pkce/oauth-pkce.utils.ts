export function getDefaultRedirectUri() {
  if (typeof window === "undefined") {
    return "http://localhost:5173/security/oauth-pkce";
  }

  return `${window.location.origin}/security/oauth-pkce`;
}

export function makeFakeToken(kind: "access" | "id", audience: string) {
  const header = base64UrlJson({ alg: "none", typ: "JWT" });
  const payload = base64UrlJson({
    aud: audience,
    exp: Math.floor(Date.now() / 1000) + 3600,
    iss: "https://auth.example.test",
    kind,
    lab: "oauth-pkce",
  });

  return `${header}.${payload}.signature-not-for-production`;
}

function base64UrlJson(value: Record<string, string | number>) {
  return btoa(JSON.stringify(value))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}
