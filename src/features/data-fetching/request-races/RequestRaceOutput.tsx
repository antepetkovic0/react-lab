import {
  CircleAlertIcon,
  CircleCheckIcon,
  Clock3Icon,
  HistoryIcon,
  SearchIcon,
  ShieldIcon,
  XCircleIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { RequestEvent, SearchView } from './request-coordinator';
import { lesson, timelineNotes } from './request-races.data';

type ResultsProps = {
  latest: RequestEvent['request'] | null;
  view: SearchView;
};

const statusStyles = {
  pending: { label: 'Pending', icon: Clock3Icon, color: 'text-primary' },
  completed: {
    label: 'Completed',
    icon: CircleCheckIcon,
    color: 'text-emerald-700 dark:text-emerald-400',
  },
  ignored: {
    label: 'Ignored',
    icon: ShieldIcon,
    color: 'text-muted-foreground',
  },
  aborted: {
    label: 'Aborted',
    icon: XCircleIcon,
    color: 'text-amber-700 dark:text-amber-400',
  },
};

export function RequestResults({ latest, view }: ResultsProps) {
  const stale = view.status !== 'idle' && view.request.id !== latest?.id;

  return (
    <div className="space-y-2" role="status">
      {view.status === 'idle' ? (
        <div className="flex items-center gap-3 rounded-lg border border-dashed bg-muted/25 p-4 text-sm text-muted-foreground">
          <SearchIcon aria-hidden="true" className="size-4 shrink-0" />
          {lesson.playground.idleResults}
        </div>
      ) : (
        <>
          {stale ? (
            <p className="flex items-start gap-2 rounded-lg bg-amber-500/10 px-3 py-2 text-xs leading-5 font-medium text-amber-800 dark:text-amber-300">
              <CircleAlertIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0"
              />
              {lesson.playground.stale}
            </p>
          ) : null}
          {view.status === 'loading' && (
            <p className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
              <Clock3Icon
                aria-hidden="true"
                className="size-4 motion-safe:animate-pulse"
              />
              Waiting for a response…
            </p>
          )}
          {view.status === 'error' && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {lesson.playground.error}
            </p>
          )}
          {view.status === 'ready' &&
            (view.items.length ? (
              <ul className="space-y-1">
                {view.items.map((item) => (
                  <li
                    className="flex items-center gap-2 px-1 py-0.5 text-sm"
                    key={item}
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 shrink-0 rounded-full bg-primary/65"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-1 text-sm text-muted-foreground">
                {lesson.playground.noResults}
              </p>
            ))}
        </>
      )}
    </div>
  );
}

export function RequestTimeline({
  events,
  displayedRequestId,
}: {
  events: RequestEvent[];
  displayedRequestId: number | undefined;
}) {
  return (
    <div aria-labelledby="race-timeline" role="log">
      {events.length ? (
        <ol className="ml-2 space-y-2 border-l border-border pl-4">
          {events.map(({ request, status, elapsed, failed }) => {
            const { label, icon: Icon, color } = statusStyles[status];
            const displayed =
              status === 'completed' && request.id === displayedRequestId;
            const note =
              failed && status === 'completed'
                ? timelineNotes.error
                : failed && status === 'ignored'
                  ? timelineNotes.ignoredError
                  : timelineNotes[status];
            const displayedNote = failed
              ? timelineNotes.displayedError
              : timelineNotes.displayed;

            return (
              <li
                className="relative flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1 rounded-lg border bg-background px-3 py-2"
                key={`${request.id}-${status}`}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-3 -left-[23px] rounded-full bg-card',
                    color,
                  )}
                >
                  <Icon className="size-3.5" />
                </span>
                <span className="min-w-0 text-sm font-medium wrap-anywhere">
                  <span className="mr-1.5 font-mono text-xs text-muted-foreground">
                    #{request.id}
                  </span>
                  “{request.query}”
                </span>
                <Badge
                  className={cn('shrink-0 border-current/20', color)}
                  variant="outline"
                >
                  {label}
                </Badge>
                <div className="flex w-full flex-wrap items-baseline justify-between gap-x-2 text-xs text-muted-foreground">
                  <span className={cn(displayed && 'font-medium text-primary')}>
                    {displayed ? displayedNote : note}
                  </span>
                  <time
                    className="font-mono tabular-nums"
                    dateTime={`PT${elapsed / 1000}S`}
                  >
                    +{elapsed} ms
                  </time>
                </div>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="flex min-h-24 items-center gap-3 rounded-lg border border-dashed bg-muted/25 p-4 text-sm text-muted-foreground">
          <HistoryIcon aria-hidden="true" className="size-4 shrink-0" />
          {lesson.playground.emptyTimeline}
        </div>
      )}
    </div>
  );
}
