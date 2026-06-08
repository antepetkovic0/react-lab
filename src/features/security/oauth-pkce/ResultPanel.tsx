import { AlertTriangleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ValueBox } from "./ValueBox";

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

export { ResultPanel };
