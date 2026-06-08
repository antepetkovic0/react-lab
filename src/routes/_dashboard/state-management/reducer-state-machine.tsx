import { createFileRoute } from '@tanstack/react-router'
import {
  BanIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  FileUpIcon,
  GitBranchIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  ShieldAlertIcon,
} from 'lucide-react'
import { useEffect, useReducer } from 'react'
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

export const Route = createFileRoute(
  '/_dashboard/state-management/reducer-state-machine',
)({
  component: ReducerStateMachinePage,
})

type UploadStatus =
  | 'idle'
  | 'ready'
  | 'uploading'
  | 'paused'
  | 'success'
  | 'error'

type UploadEvent =
  | { type: 'SELECT_FILE'; fileName: string }
  | { type: 'START' }
  | { type: 'PROGRESS'; amount: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'FAIL'; message: string }
  | { type: 'RETRY' }
  | { type: 'CANCEL' }
  | { type: 'RESET' }

type EventLogItem = {
  id: number
  event: UploadEvent['type']
  from: UploadStatus
  to: UploadStatus
  accepted: boolean
  note: string
}

type UploadState = {
  status: UploadStatus
  fileName: string | null
  progress: number
  attempts: number
  error: string | null
  eventCount: number
  log: EventLogItem[]
}

const initialUploadState: UploadState = {
  status: 'idle',
  fileName: null,
  progress: 0,
  attempts: 0,
  error: null,
  eventCount: 0,
  log: [],
}

const sampleFiles = [
  'react-lab-notes.pdf',
  'state-chart-sketch.png',
  'upload-demo.zip',
]

const concepts = [
  {
    title: 'One mode at a time',
    icon: CircleDotIcon,
    description:
      'The upload can be idle, ready, uploading, paused, successful, or failed. It cannot be all of those at once.',
  },
  {
    title: 'Events describe intent',
    icon: GitBranchIcon,
    description:
      'The UI dispatches events such as START, PAUSE, and RETRY instead of reaching into separate setters.',
  },
  {
    title: 'Effects stay outside',
    icon: ShieldAlertIcon,
    description:
      'The reducer returns the next state. The timer that simulates upload progress runs in an effect.',
  },
]

const statusMeta: Record<
  UploadStatus,
  {
    label: string
    description: string
    className: string
  }
> = {
  idle: {
    label: 'Idle',
    description: 'No file has been selected yet.',
    className: 'border-muted-foreground/20 bg-muted/40 text-muted-foreground',
  },
  ready: {
    label: 'Ready',
    description: 'A file is selected and waiting to start.',
    className: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  uploading: {
    label: 'Uploading',
    description: 'Progress events are allowed while the effect is running.',
    className: 'border-primary/30 bg-primary/10 text-primary',
  },
  paused: {
    label: 'Paused',
    description: 'Progress is frozen until RESUME is dispatched.',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  success: {
    label: 'Success',
    description: 'The upload reached 100%. Progress events are ignored now.',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  error: {
    label: 'Error',
    description: 'The upload failed. Retry or reset to move forward.',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
}

const transitionRows = [
  ['idle', 'SELECT_FILE', 'ready'],
  ['ready', 'START', 'uploading'],
  ['uploading', 'PROGRESS', 'uploading or success'],
  ['uploading', 'PAUSE', 'paused'],
  ['paused', 'RESUME', 'uploading'],
  ['uploading', 'FAIL', 'error'],
  ['error', 'RETRY', 'uploading'],
  ['uploading or paused', 'CANCEL', 'idle'],
  ['success or error', 'RESET', 'idle'],
]

const reducerCode = `type UploadState =
  | { status: "idle" }
  | { status: "ready"; fileName: string }
  | { status: "uploading"; fileName: string; progress: number }
  | { status: "paused"; fileName: string; progress: number }
  | { status: "success"; fileName: string }
  | { status: "error"; fileName: string; message: string };

type UploadEvent =
  | { type: "SELECT_FILE"; fileName: string }
  | { type: "START" }
  | { type: "PROGRESS"; amount: number }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "FAIL"; message: string }
  | { type: "RETRY" }
  | { type: "RESET" };

function uploadReducer(state: UploadState, event: UploadEvent): UploadState {
  switch (state.status) {
    case "idle":
      if (event.type === "SELECT_FILE") {
        return { status: "ready", fileName: event.fileName };
      }
      return state;

    case "ready":
      if (event.type === "START") {
        return { ...state, status: "uploading", progress: 0 };
      }
      return state;

    case "uploading":
      if (event.type === "PROGRESS") {
        const progress = Math.min(100, state.progress + event.amount);
        return progress === 100
          ? { status: "success", fileName: state.fileName }
          : { ...state, progress };
      }
      if (event.type === "PAUSE") return { ...state, status: "paused" };
      if (event.type === "FAIL") {
        return { status: "error", fileName: state.fileName, message: event.message };
      }
      return state;

    case "paused":
      if (event.type === "RESUME") return { ...state, status: "uploading" };
      return state;

    case "error":
      if (event.type === "RETRY") {
        return { status: "uploading", fileName: state.fileName, progress: 0 };
      }
      return state;

    default:
      return state;
  }
}`

function recordEvent(
  state: UploadState,
  event: UploadEvent,
  nextState: UploadState,
  accepted: boolean,
  note: string,
) {
  const nextCount = state.eventCount + 1

  return {
    ...nextState,
    eventCount: nextCount,
    log: [
      {
        id: nextCount,
        event: event.type,
        from: state.status,
        to: nextState.status,
        accepted,
        note,
      },
      ...state.log,
    ].slice(0, 7),
  }
}

function ignoreEvent(state: UploadState, event: UploadEvent, note: string) {
  return recordEvent(state, event, state, false, note)
}

function uploadReducer(state: UploadState, event: UploadEvent): UploadState {
  switch (event.type) {
    case 'SELECT_FILE': {
      if (state.status !== 'idle') {
        return ignoreEvent(state, event, 'Select a new file after reset.')
      }

      return recordEvent(
        state,
        event,
        {
          ...state,
          status: 'ready',
          fileName: event.fileName,
          progress: 0,
          error: null,
        },
        true,
        'File selected. START is now valid.',
      )
    }

    case 'START': {
      if (state.status !== 'ready') {
        return ignoreEvent(state, event, 'START only works from ready.')
      }

      return recordEvent(
        state,
        event,
        { ...state, status: 'uploading', attempts: state.attempts + 1 },
        true,
        'Upload effect can begin ticking.',
      )
    }

    case 'PROGRESS': {
      if (state.status !== 'uploading') {
        return ignoreEvent(
          state,
          event,
          'Progress is ignored unless uploading.',
        )
      }

      const progress = Math.min(100, state.progress + event.amount)
      const status = progress === 100 ? 'success' : 'uploading'

      return recordEvent(
        state,
        event,
        { ...state, status, progress },
        true,
        progress === 100
          ? 'Reached the terminal success state.'
          : 'Progress accepted.',
      )
    }

    case 'PAUSE': {
      if (state.status !== 'uploading') {
        return ignoreEvent(state, event, 'PAUSE only works while uploading.')
      }

      return recordEvent(
        state,
        event,
        { ...state, status: 'paused' },
        true,
        'Timer cleanup stops progress events.',
      )
    }

    case 'RESUME': {
      if (state.status !== 'paused') {
        return ignoreEvent(state, event, 'RESUME only works from paused.')
      }

      return recordEvent(
        state,
        event,
        { ...state, status: 'uploading' },
        true,
        'Upload effect starts again.',
      )
    }

    case 'FAIL': {
      if (state.status !== 'uploading') {
        return ignoreEvent(state, event, 'FAIL only works while uploading.')
      }

      return recordEvent(
        state,
        event,
        { ...state, status: 'error', error: event.message },
        true,
        'Moved to error with retry data preserved.',
      )
    }

    case 'RETRY': {
      if (state.status !== 'error') {
        return ignoreEvent(state, event, 'RETRY only works from error.')
      }

      return recordEvent(
        state,
        event,
        {
          ...state,
          status: 'uploading',
          progress: 0,
          attempts: state.attempts + 1,
          error: null,
        },
        true,
        'Retry restarts progress without selecting a file again.',
      )
    }

    case 'CANCEL': {
      if (state.status !== 'uploading' && state.status !== 'paused') {
        return ignoreEvent(
          state,
          event,
          'CANCEL only works during an active upload.',
        )
      }

      return recordEvent(
        state,
        event,
        { ...initialUploadState, eventCount: state.eventCount, log: state.log },
        true,
        'Active upload cancelled and state returned to idle.',
      )
    }

    case 'RESET': {
      if (state.status !== 'success' && state.status !== 'error') {
        return ignoreEvent(
          state,
          event,
          'RESET is reserved for terminal states.',
        )
      }

      return recordEvent(
        state,
        event,
        { ...initialUploadState, eventCount: state.eventCount, log: state.log },
        true,
        'Terminal state cleared.',
      )
    }
  }
}

function StatusBadge({ status }: { status: UploadStatus }) {
  const meta = statusMeta[status]

  return (
    <Badge className={cn('border', meta.className)} variant="outline">
      {meta.label}
    </Badge>
  )
}

function ReducerStateMachinePage() {
  const [state, dispatch] = useReducer(uploadReducer, initialUploadState)
  const status = statusMeta[state.status]
  const nextFile = sampleFiles[state.eventCount % sampleFiles.length]

  useEffect(() => {
    if (state.status !== 'uploading') {
      return
    }

    const intervalId = window.setInterval(() => {
      dispatch({ type: 'PROGRESS', amount: 11 })
    }, 650)

    return () => window.clearInterval(intervalId)
  }, [state.status])

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
          const Icon = concept.icon

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
          )
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
                    {state.fileName ?? 'No file selected'}
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
                disabled={state.status !== 'idle'}
                onClick={() =>
                  dispatch({ type: 'SELECT_FILE', fileName: nextFile })
                }
                type="button"
              >
                <FileUpIcon className="size-4" />
                Select
              </Button>
              <Button
                disabled={state.status !== 'ready'}
                onClick={() => dispatch({ type: 'START' })}
                type="button"
              >
                <PlayIcon className="size-4" />
                Start
              </Button>
              <Button
                disabled={state.status !== 'uploading'}
                onClick={() => dispatch({ type: 'PAUSE' })}
                type="button"
                variant="outline"
              >
                <PauseIcon className="size-4" />
                Pause
              </Button>
              <Button
                disabled={state.status !== 'paused'}
                onClick={() => dispatch({ type: 'RESUME' })}
                type="button"
                variant="outline"
              >
                <PlayIcon className="size-4" />
                Resume
              </Button>
              <Button
                disabled={state.status !== 'uploading'}
                onClick={() =>
                  dispatch({
                    type: 'FAIL',
                    message: 'Network timeout while sending the last chunk.',
                  })
                }
                type="button"
                variant="outline"
              >
                <ShieldAlertIcon className="size-4" />
                Fail
              </Button>
              <Button
                disabled={state.status !== 'error'}
                onClick={() => dispatch({ type: 'RETRY' })}
                type="button"
                variant="outline"
              >
                <RefreshCwIcon className="size-4" />
                Retry
              </Button>
              <Button
                disabled={
                  state.status !== 'uploading' && state.status !== 'paused'
                }
                onClick={() => dispatch({ type: 'CANCEL' })}
                type="button"
                variant="outline"
              >
                <BanIcon className="size-4" />
                Cancel
              </Button>
              <Button
                disabled={
                  state.status !== 'success' && state.status !== 'error'
                }
                onClick={() => dispatch({ type: 'RESET' })}
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
                  'idle',
                  'ready',
                  'uploading',
                  'paused',
                  'success',
                  'error',
                ] as const
              ).map((machineStatus) => (
                <div
                  className={cn(
                    'rounded-lg border p-3 text-sm transition-colors',
                    state.status === machineStatus
                      ? 'border-primary/40 bg-primary/5'
                      : 'bg-background',
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
                        'border',
                        item.accepted
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-muted-foreground/20 bg-muted text-muted-foreground',
                      )}
                      variant="outline"
                    >
                      {item.accepted ? 'accepted' : 'ignored'}
                    </Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.from} {'->'} {item.to}
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
  )
}
