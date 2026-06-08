import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  FileTextIcon,
  FlaskConicalIcon,
  KeyRoundIcon,
  LockKeyholeIcon,
  RefreshCcwIcon,
  ServerCogIcon,
  ShieldCheckIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RouteBreadcrumbs } from "@/components/shared/route-breadcrumbs/RouteBreadcrumbs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { randomBase64Url, sha256Base64Url } from "@/lib/crypto";

export const Route = createFileRoute("/_dashboard/security/oauth-pkce")({
  component: OAuthPkcePage,
});

type AuthCodeRecord = {
  code: string;
  codeChallenge: string;
  codeChallengeMethod: "S256";
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
  used: boolean;
};

type CallbackParams = {
  code: string;
  state: string;
};

type TokenExchangeResult =
  | {
      status: "success";
      title: string;
      description: string;
      accessToken: string;
      idToken: string;
    }
  | {
      status: "error";
      title: string;
      description: string;
    };

const protocolSteps = [
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

const storageOptions = [
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

const tokenExchangeCode = `async function redeemAuthorizationCode(code, codeVerifier) {
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

function OAuthPkcePage() {
  const [clientId, setClientId] = useState("react-lab-spa");
  const [scope, setScope] = useState("openid profile email");
  const [redirectUri] = useState(getDefaultRedirectUri);
  const [verifier, setVerifier] = useState("");
  const [challenge, setChallenge] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [serverRecord, setServerRecord] = useState<AuthCodeRecord | null>(null);
  const [callbackParams, setCallbackParams] = useState<CallbackParams | null>(
    null,
  );
  const [tokenResult, setTokenResult] = useState<TokenExchangeResult | null>(
    null,
  );

  const [storageChoice, setStorageChoice] =
    useState<(typeof storageOptions)[number]["id"]>("memory");

  const authorizationUrl = useMemo(() => {
    if (!challenge || !stateValue) {
      return "Generate a PKCE transaction first.";
    }

    const url = new URL("https://auth.example.test/oauth/authorize");
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", scope);
    url.searchParams.set("state", stateValue);
    url.searchParams.set("code_challenge", challenge);
    url.searchParams.set("code_challenge_method", "S256");

    return url.toString();
  }, [challenge, clientId, redirectUri, scope, stateValue]);

  const generateTransaction = useCallback(async () => {
    const nextVerifier = randomBase64Url(64);
    const nextChallenge = await sha256Base64Url(nextVerifier);

    setVerifier(nextVerifier);
    setChallenge(nextChallenge);
    setStateValue(randomBase64Url(24));
    setServerRecord(null);
    setCallbackParams(null);
    setTokenResult(null);
  }, []);

  useEffect(() => {
    generateTransaction();
  }, [generateTransaction]);

  function authorizeRequest() {
    if (!challenge || !stateValue) {
      return;
    }

    const code = randomBase64Url(32);

    setServerRecord({
      code,
      codeChallenge: challenge,
      codeChallengeMethod: "S256",
      clientId,
      redirectUri,
      scope,
      state: stateValue,
      used: false,
    });
    setCallbackParams({ code, state: stateValue });
    setTokenResult(null);
  }

  async function redeemCode(options?: {
    verifierOverride?: string;
    stateOverride?: string;
    reuseCode?: boolean;
  }) {
    if (!serverRecord || !callbackParams) {
      setTokenResult({
        status: "error",
        title: "No authorization code",
        description: "Run the authorization step before exchanging a code.",
      });
      return;
    }

    const submittedState = options?.stateOverride ?? callbackParams.state;
    const submittedVerifier = options?.verifierOverride ?? verifier;

    if (submittedState !== stateValue) {
      setTokenResult({
        status: "error",
        title: "State validation failed",
        description:
          "The callback state does not match the browser transaction, so the client rejects the response before token exchange.",
      });
      return;
    }

    if (serverRecord.used && !options?.reuseCode) {
      setTokenResult({
        status: "error",
        title: "Authorization code already used",
        description:
          "A real provider invalidates each authorization code after one successful token exchange.",
      });
      return;
    }

    const submittedChallenge = await sha256Base64Url(submittedVerifier);

    if (submittedChallenge !== serverRecord.codeChallenge) {
      setTokenResult({
        status: "error",
        title: "PKCE verification failed",
        description:
          "Hashing the submitted verifier did not recreate the original code_challenge, so an intercepted code is useless.",
      });
      return;
    }

    setServerRecord({ ...serverRecord, used: true });
    setTokenResult({
      status: "success",
      title: "Token exchange accepted",
      description:
        "The verifier matched the challenge, so the fake provider returned tokens for this public client.",
      accessToken: makeFakeToken("access", clientId),
      idToken: makeFakeToken("id", clientId),
    });
  }

  const selectedStorage = storageOptions.find(
    (option) => option.id === storageChoice,
  );

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              OAuth 2.0 with PKCE
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Security
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Walk through the Authorization Code flow for a public React client.
            The PKCE values are real browser crypto; the provider and token
            endpoint are simulated because this lab intentionally has no server.
          </p>
        </div>

        <Button onClick={() => generateTransaction()} variant="outline">
          <RefreshCcwIcon className="size-4" />
          New transaction
        </Button>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {protocolSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={step.title}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <Badge variant={index < 2 ? "default" : "secondary"}>
                  {String(index + 1).padStart(2, "0")}
                </Badge>
              </div>
              <h2 className="mt-4 text-sm font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </article>
          );
        })}
      </section>

      <div className="grid items-stretch gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-4">
          <Card className="gap-0 py-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <LockKeyholeIcon className="size-4 text-primary" />
                <span className="text-sm font-medium">PKCE Flow Simulator</span>
              </div>
              <Badge variant="outline">Browser-only lab</Badge>
            </div>

            <CardContent className="space-y-5 p-4">
              <section className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="client-id">
                    Client ID
                  </label>
                  <Input
                    id="client-id"
                    onChange={(event) => setClientId(event.target.value)}
                    value={clientId}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="scope">
                    Scope
                  </label>
                  <Input
                    id="scope"
                    onChange={(event) => setScope(event.target.value)}
                    value={scope}
                  />
                </div>
              </section>

              <section className="rounded-lg border bg-muted/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">
                      1. Generate verifier and challenge
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      The verifier stays with the client. The challenge travels
                      to the authorization server.
                    </p>
                  </div>
                  <Badge variant="secondary">S256</Badge>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <ValueBox label="code_verifier" value={verifier} />
                  <ValueBox label="code_challenge" value={challenge} />
                </div>
              </section>

              <section className="rounded-lg border bg-background p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">
                      2. Build authorization request
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      State protects the callback. The challenge binds the
                      future code exchange to this browser transaction.
                    </p>
                  </div>
                  <Button onClick={authorizeRequest}>
                    Authorize
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </div>

                <div className="mt-4 space-y-3">
                  <ValueBox label="redirect_uri" value={redirectUri} />
                  <ValueBox label="state" value={stateValue} />
                  <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
                    <code>{authorizationUrl}</code>
                  </pre>
                </div>
              </section>

              <section className="rounded-lg border bg-muted/20 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold">
                      3. Handle callback and exchange the code
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      The app validates state, then sends the code and verifier
                      to the token endpoint.
                    </p>
                  </div>
                  <Button
                    disabled={!callbackParams}
                    onClick={() => void redeemCode()}
                    variant="outline"
                  >
                    Redeem code
                  </Button>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <ValueBox
                    label="callback code"
                    value={callbackParams?.code ?? "Waiting for authorization"}
                  />
                  <ValueBox
                    label="callback state"
                    value={callbackParams?.state ?? "Waiting for authorization"}
                  />
                </div>

                {tokenResult ? <ResultPanel result={tokenResult} /> : null}
              </section>

              <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
                <div className="flex gap-2">
                  <AlertTriangleIcon className="mt-0.5 size-4 shrink-0 text-destructive" />
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-sm font-semibold">
                        Break the flow on purpose
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        These failures are the useful part of the lab. They show
                        which check catches which class of mistake or attack.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        disabled={!callbackParams}
                        onClick={() =>
                          void redeemCode({ verifierOverride: `${verifier}x` })
                        }
                        size="sm"
                        variant="destructive"
                      >
                        Wrong verifier
                      </Button>
                      <Button
                        disabled={!callbackParams}
                        onClick={() =>
                          void redeemCode({ stateOverride: "tampered-state" })
                        }
                        size="sm"
                        variant="destructive"
                      >
                        Tamper state
                      </Button>
                      <Button
                        disabled={!callbackParams || !serverRecord?.used}
                        onClick={() => void redeemCode()}
                        size="sm"
                        variant="destructive"
                      >
                        Redeem twice
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            </CardContent>
          </Card>

          <Card className="gap-0 overflow-hidden py-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
              <div className="flex items-center gap-2">
                <FileTextIcon className="size-4 text-primary" />
                <span className="text-sm font-medium">RFC 7636</span>
              </div>
              <Badge variant="outline">Reference</Badge>
            </div>
            <CardContent className="p-0">
              <iframe
                className="block h-[550px] w-full border-0 bg-background"
                loading="lazy"
                src="https://www.rfc-editor.org/rfc/rfc7636.html"
                title="RFC 7636: Proof Key for Code Exchange"
              />
            </CardContent>
          </Card>
        </div>

        <aside className="grid gap-4 xl:auto-rows-fr">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ServerCogIcon className="size-4 text-primary" />
                Fake Token Endpoint
              </CardTitle>
              <CardDescription>
                What the simulated provider currently knows.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <StatusRow
                label="Authorization code"
                value={serverRecord?.code ?? "Not issued"}
              />
              <StatusRow
                label="Challenge method"
                value={serverRecord?.codeChallengeMethod ?? "Waiting"}
              />
              <StatusRow
                label="Code status"
                value={serverRecord?.used ? "Used" : "Unused or missing"}
              />
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-muted-foreground">
                A real provider keeps this record server-side. The SPA never
                gets to decide whether a code is valid.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConicalIcon className="size-4 text-primary" />
                Production Boundary
              </CardTitle>
              <CardDescription>
                What changes when this leaves the lab.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                The SPA may generate PKCE values, but it cannot keep a client
                secret and cannot create HttpOnly session cookies by itself.
              </p>
              <p>
                In production, the authorization server validates the code and
                verifier. A backend-for-frontend can then trade provider tokens
                for a server-owned session cookie.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Storage</CardTitle>
              <CardDescription>
                Compare where a SPA could keep access tokens.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2">
                {storageOptions.map((option) => (
                  <button
                    className="rounded-lg border bg-background p-3 text-left text-sm transition-colors hover:bg-muted/30 data-[active=true]:border-primary data-[active=true]:bg-primary/5"
                    data-active={storageChoice === option.id}
                    key={option.id}
                    onClick={() => setStorageChoice(option.id)}
                    type="button"
                  >
                    <span className="font-medium">{option.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {option.risk}
                    </span>
                  </button>
                ))}
              </div>
              <div className="rounded-lg border bg-muted/20 p-3 text-sm leading-6 text-muted-foreground">
                Selected:{" "}
                <span className="font-semibold text-foreground">
                  {selectedStorage?.label}
                </span>
                . PKCE protects code redemption, but XSS still changes the
                token-storage discussion.
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exchange Shape</CardTitle>
              <CardDescription>
                The browser submits the verifier during token exchange.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{tokenExchangeCode}</code>
              </pre>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

type ValueBoxProps = {
  label: string;
  value: string;
};

function ValueBox({ label, value }: ValueBoxProps) {
  return (
    <div className="rounded-lg border bg-background p-3">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 min-h-6 break-all font-mono text-xs leading-5">
        {value || "Generating..."}
      </p>
    </div>
  );
}

type StatusRowProps = {
  label: string;
  value: string;
};

function StatusRow({ label, value }: StatusRowProps) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-lg border bg-muted/20 p-3">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <span className="max-w-44 break-all text-right font-mono text-xs">
        {value}
      </span>
    </div>
  );
}

function ResultPanel({ result }: { result: TokenExchangeResult }) {
  const isSuccess = result.status === "success";
  const Icon = isSuccess ? CheckCircle2Icon : AlertTriangleIcon;

  return (
    <Alert
      className={
        isSuccess
          ? "mt-4 border-primary/30 bg-primary/5"
          : "mt-4 border-destructive/30 bg-destructive/5"
      }
      variant={isSuccess ? "default" : "destructive"}
    >
      <Icon className={isSuccess ? "text-primary" : undefined} />
      <AlertTitle>{result.title}</AlertTitle>
      <AlertDescription className="space-y-2 text-muted-foreground">
        <p>{result.description}</p>
        {isSuccess ? (
          <div className="grid gap-2">
            <ValueBox label="fake access_token" value={result.accessToken} />
            <ValueBox label="fake id_token" value={result.idToken} />
          </div>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}

function getDefaultRedirectUri() {
  if (typeof window === "undefined") {
    return "http://localhost:5173/security/oauth-pkce";
  }

  return `${window.location.origin}/security/oauth-pkce`;
}

function makeFakeToken(kind: "access" | "id", audience: string) {
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
