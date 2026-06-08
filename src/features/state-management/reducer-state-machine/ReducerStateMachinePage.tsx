import {
  BanIcon,
  CheckCircle2Icon,
  FileUpIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  ShieldAlertIcon,
} from "lucide-react";
import { useEffect, useReducer } from "react";
import { RouteBreadcrumbs } from "@/components/shared/route-breadcrumbs/RouteBreadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  concepts,
  reducerCode,
  sampleFiles,
  statusMeta,
  transitionRows,
} from "./reducer-state-machine.data";
import { StatusBadge } from "./StatusBadge";
import { initialUploadState, uploadReducer } from "./upload-reducer";

function ReducerStateMachinePage() {
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState);
  const status = statusMeta[state.status];
  const nextFile = sampleFiles[state.eventCount % sampleFiles.length];

  useEffect(() => {
    if (state.status !== "uploading") {
      return;
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: "PROGRESS", amount: 11 });
    }, 650);

    return () => window.clearInterval(intervalId);
  }, [state.status]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Reducer State Machine
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              State Management
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Replace scattered loading flags with one reducer that models valid
            upload states, events, and transitions. The UI dispatches events;
            the reducer decides what can happen next.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {concepts.map((concept) => {
          const Icon = concept.icon;

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={concept.title}
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h2 className="text-sm font-semibold">{concept.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {concept.description}
              </p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <Card className="gap-0 py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <FileUpIcon className="size-4 text-primary" />
              <span className="text-sm font-medium">Example: Upload Flow</span>
            </div>
            <StatusBadge status={state.status} />
          </div>
          <CardContent className="space-y-5 p-4">
            <div className="rounded-lg border bg-muted/20 p-4">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Current state
                  </p>
                  <h2 className="text-xl font-semibold">{status.label}</h2>
                  <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                    {status.description}
                  </p>
                </div>
                <div className="rounded-md border bg-background px-3 py-2 text-right">
                  <p className="text-xs font-medium text-muted-foreground">
                    Attempts
                  </p>
                  <p className="text-lg font-semibold">{state.attempts}</p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-medium">
                    {state.fileName ?? "No file selected"}
                  </span>
                  <span className="text-muted-foreground">
                    {state.progress}%
                  </span>
                </div>
                <div
                  aria-label="Upload progress"
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={state.progress}
                  className="h-3 overflow-hidden rounded-full bg-muted"
                  role="progressbar"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300"
                    style={{ width: `${state.progress}%` }}
                  />
                </div>
                {state.error ? (
                  <p className="text-sm font-medium text-destructive">
                    {state.error}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <Button
                disabled={state.status !== "idle"}
                onClick={() =>
                  dispatch({ type: "SELECT_FILE", fileName: nextFile })
                }
                type="button"
              >
                <FileUpIcon className="size-4" />
                Select
              </Button>
              <Button
                disabled={state.status !== "ready"}
                onClick={() => dispatch({ type: "START" })}
                type="button"
              >
                <PlayIcon className="size-4" />
                Start
              </Button>
              <Button
                disabled={state.status !== "uploading"}
                onClick={() => dispatch({ type: "PAUSE" })}
                type="button"
                variant="outline"
              >
                <PauseIcon className="size-4" />
                Pause
              </Button>
              <Button
                disabled={state.status !== "paused"}
                onClick={() => dispatch({ type: "RESUME" })}
                type="button"
                variant="outline"
              >
                <PlayIcon className="size-4" />
                Resume
              </Button>
              <Button
                disabled={state.status !== "uploading"}
                onClick={() =>
                  dispatch({
                    type: "FAIL",
                    message: "Network timeout while sending the last chunk.",
                  })
                }
                type="button"
                variant="outline"
              >
                <ShieldAlertIcon className="size-4" />
                Fail
              </Button>
              <Button
                disabled={state.status !== "error"}
                onClick={() => dispatch({ type: "RETRY" })}
                type="button"
                variant="outline"
              >
                <RefreshCwIcon className="size-4" />
                Retry
              </Button>
              <Button
                disabled={
                  state.status !== "uploading" && state.status !== "paused"
                }
                onClick={() => dispatch({ type: "CANCEL" })}
                type="button"
                variant="outline"
              >
                <BanIcon className="size-4" />
                Cancel
              </Button>
              <Button
                disabled={
                  state.status !== "success" && state.status !== "error"
                }
                onClick={() => dispatch({ type: "RESET" })}
                type="button"
                variant="outline"
              >
                <RotateCcwIcon className="size-4" />
                Reset
              </Button>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              {(
                [
                  "idle",
                  "ready",
                  "uploading",
                  "paused",
                  "success",
                  "error",
                ] as const
              ).map((machineStatus) => (
                <div
                  className={cn(
                    "rounded-lg border p-3 text-sm transition-colors",
                    state.status === machineStatus
                      ? "border-primary/40 bg-primary/5"
                      : "bg-background",
                  )}
                  key={machineStatus}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold">
                      {statusMeta[machineStatus].label}
                    </span>
                    {state.status === machineStatus ? (
                      <CheckCircle2Icon className="size-4 text-primary" />
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {statusMeta[machineStatus].description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="gap-0 py-0">
          <CardHeader className="border-b p-4">
            <CardTitle className="text-base">Event Log</CardTitle>
            <CardDescription>
              Accepted events move the machine. Rejected events leave the state
              unchanged.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-4">
            {state.log.length === 0 ? (
              <div className="rounded-lg border border-dashed p-4 text-sm leading-6 text-muted-foreground">
                Select a file to start recording transitions.
              </div>
            ) : (
              state.log.map((item) => (
                <article className="rounded-lg border p-3" key={item.id}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold">{item.event}</span>
                    <Badge
                      className={cn(
                        "border",
                        item.accepted
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-muted-foreground/20 bg-muted text-muted-foreground",
                      )}
                      variant="outline"
                    >
                      {item.accepted ? "accepted" : "ignored"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.from} {"->"} {item.to}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {item.note}
                  </p>
                </article>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <section className="grid gap-4 xl:grid-cols-[390px_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transition Table</CardTitle>
            <CardDescription>
              A reducer state machine starts with a small map of allowed moves.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border">
              <div className="grid grid-cols-3 border-b bg-muted/40 px-3 py-2 text-xs font-semibold text-muted-foreground">
                <span>From</span>
                <span>Event</span>
                <span>To</span>
              </div>
              {transitionRows.map(([from, event, to]) => (
                <div
                  className="grid grid-cols-3 gap-2 border-b px-3 py-2 text-xs last:border-b-0"
                  key={`${from}-${event}`}
                >
                  <span className="text-muted-foreground">{from}</span>
                  <span className="font-medium">{event}</span>
                  <span className="text-muted-foreground">{to}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Reducer Sketch</CardTitle>
            <CardDescription>
              Model states and events first, then keep side effects out of the
              reducer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[560px] overflow-auto rounded-lg bg-muted p-4 text-xs leading-6">
              <code>{reducerCode}</code>
            </pre>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export { ReducerStateMachinePage };
