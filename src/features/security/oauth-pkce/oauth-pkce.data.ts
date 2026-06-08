import {
  ArrowRightIcon,
  KeyRoundIcon,
  ServerCogIcon,
  ShieldCheckIcon,
} from "lucide-react";

export const protocolSteps = [
  {
    title: "Client creates entropy",
    icon: KeyRoundIcon,
    description:
      "The SPA generates a high-entropy code_verifier and stores it only for this login attempt.",
  },
  {
    title: "Challenge goes out",
    icon: ArrowRightIcon,
    description:
      "The authorization request sends the SHA-256 code_challenge, plus state for CSRF protection.",
  },
  {
    title: "Code comes back",
    icon: ServerCogIcon,
    description:
      "The provider redirects with an authorization code bound to the original challenge.",
  },
  {
    title: "Verifier proves ownership",
    icon: ShieldCheckIcon,
    description:
      "The token endpoint hashes the submitted verifier and compares it with the stored challenge.",
  },
];

export const storageOptions = [
  {
    id: "memory",
    label: "Memory",
    risk: "Lost on refresh, smallest browser exposure.",
  },
  {
    id: "sessionStorage",
    label: "sessionStorage",
    risk: "Survives reloads in one tab, exposed to injected JavaScript.",
  },
  {
    id: "localStorage",
    label: "localStorage",
    risk: "Persists across sessions, exposed to injected JavaScript.",
  },
] as const;

export const tokenExchangeCode = `async function redeemAuthorizationCode(code, codeVerifier) {
    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: "react-lab-spa",
      redirect_uri: window.location.origin + "/security/oauth-pkce",
      code,
      code_verifier: codeVerifier,
    });
  
    return fetch("https://provider.example/oauth/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });
  }`;
