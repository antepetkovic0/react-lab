import {
  ChevronDownIcon,
  FlaskConicalIcon,
  HistoryIcon,
  PlayIcon,
  RotateCcwIcon,
  SearchIcon,
  ShieldIcon,
  TriangleAlertIcon,
  XCircleIcon,
} from 'lucide-react';
import {
  type FormEvent,
  useEffect,
  useState,
  useSyncExternalStore,
} from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { RequestResults, RequestTimeline } from './RequestRaceOutput';
import {
  createRequestCoordinator,
  type SearchMode,
} from './request-coordinator';
import { lesson, modes, race } from './request-races.data';
import { simulateSearch } from './simulate-search';

const modeIcons = {
  unprotected: TriangleAlertIcon,
  guard: ShieldIcon,
  cancellation: XCircleIcon,
};

export function RequestRacePlayground() {
  const [coordinator] = useState(() =>
    createRequestCoordinator(simulateSearch),
  );
  const { events, latest, view } = useSyncExternalStore(
    coordinator.subscribe,
    coordinator.getSnapshot,
  );
  const [mode, setMode] = useState<SearchMode>('unprotected');
  const [query, setQuery] = useState('');
  const [slowDelay, setSlowDelay] = useState(race.slow.initial);
  const [fastDelay, setFastDelay] = useState(race.fast.initial);

  const displayedRequestId =
    view.status === 'ready' || view.status === 'error'
      ? view.request.id
      : undefined;

  useEffect(() => coordinator.clear, [coordinator]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    void coordinator.start({ query: trimmed, delay: fastDelay }, mode);
  }

  return (
    <Card className="@container gap-0 py-0">
      <section aria-labelledby="race-playground">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-primary/15 bg-primary/5 p-4 @xl:px-5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FlaskConicalIcon aria-hidden="true" className="size-4" />
            </span>
            <div>
              <h2 className="text-base font-semibold" id="race-playground">
                {lesson.playground.title}
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {lesson.playground.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => {
                setQuery(race.fast.query);
                coordinator.runRace(
                  { query: race.slow.query, delay: slowDelay },
                  { query: race.fast.query, delay: fastDelay },
                  race.gap,
                  mode,
                );
              }}
              size="lg"
              type="button"
            >
              <PlayIcon aria-hidden="true" /> Run race
            </Button>
            <Button
              onClick={() => {
                coordinator.clear();
                setQuery('');
              }}
              size="lg"
              type="button"
              variant="outline"
            >
              <RotateCcwIcon aria-hidden="true" /> Reset
            </Button>
          </div>
        </div>

        <div className="space-y-4 border-b p-4 @xl:px-5">
          <div>
            <p
              className="mb-2 text-sm font-semibold"
              id="race-request-handling"
            >
              Request handling
            </p>
            <RadioGroup
              aria-labelledby="race-request-handling"
              className="@2xl:grid-cols-3"
              onValueChange={(value) => {
                const nextMode = modes.find(({ id }) => id === value);
                if (nextMode) {
                  coordinator.clear();
                  setMode(nextMode.id);
                }
              }}
              value={mode}
            >
              {modes.map(({ id, title, description }) => {
                const Icon = modeIcons[id];

                return (
                  <label
                    className="flex h-full cursor-pointer items-start gap-2.5 rounded-lg border p-2.5 transition-colors hover:bg-muted/50 has-focus-visible:ring-2 has-focus-visible:ring-ring has-data-[state=checked]:border-primary/60 has-data-[state=checked]:bg-primary/5"
                    htmlFor={`race-mode-${id}`}
                    key={id}
                  >
                    <Icon
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                    <span className="flex-1">
                      <span
                        className="block text-sm font-semibold"
                        id={`race-mode-${id}-title`}
                      >
                        {title}
                      </span>
                      <span
                        className="mt-0.5 block text-xs leading-4.5 text-muted-foreground"
                        id={`race-mode-${id}-description`}
                      >
                        {description}
                      </span>
                    </span>
                    <RadioGroupItem
                      aria-describedby={`race-mode-${id}-description`}
                      aria-labelledby={`race-mode-${id}-title`}
                      className="mt-0.5 cursor-pointer"
                      id={`race-mode-${id}`}
                      value={id}
                    />
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          <div className="relative rounded-lg border bg-muted/30 px-3 py-2">
            <div className="flex min-h-6 flex-wrap items-center gap-x-3 gap-y-1 pt-7 text-xs tabular-nums @xl:pt-0 @xl:pr-44">
              <div className="whitespace-nowrap">
                <span className="text-muted-foreground">First</span>{' '}
                <strong className="font-semibold">{race.slow.query}</strong>{' '}
                <span className="text-muted-foreground">{slowDelay} ms</span>
              </div>
              <span className="whitespace-nowrap text-muted-foreground">
                <span aria-hidden="true">.. </span>
                {race.gap}ms later
                <span aria-hidden="true"> ..</span>
              </span>
              <div className="whitespace-nowrap">
                <span className="text-muted-foreground">Second</span>{' '}
                <strong className="font-semibold">{race.fast.query}</strong>{' '}
                <span className="text-muted-foreground">{fastDelay} ms</span>
              </div>
            </div>
            <details className="group/delays">
              <summary className="absolute top-2 right-3 flex min-h-6 cursor-pointer list-none items-center gap-1 rounded text-xs font-medium text-primary focus-visible:outline-2 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                Adjust response delays
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-3.5 group-open/delays:rotate-180"
                />
              </summary>
              <div className="mt-2 grid gap-3 border-t pt-3 @xl:grid-cols-2">
                {[
                  {
                    ...race.slow,
                    label: 'Slow response',
                    delay: slowDelay,
                    setDelay: setSlowDelay,
                  },
                  {
                    ...race.fast,
                    label: 'Fast response',
                    delay: fastDelay,
                    setDelay: setFastDelay,
                  },
                ].map(({ label, delay, setDelay, min, max }) => (
                  <div className="grid gap-1" key={label}>
                    <div className="flex items-center justify-between gap-2 text-xs font-medium">
                      <span>{label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {delay} ms
                      </span>
                    </div>
                    <Slider
                      className="h-7 cursor-pointer"
                      max={max}
                      min={min}
                      onValueChange={([value]) => setDelay(value)}
                      step={100}
                      thumbProps={{
                        'aria-label': label,
                        'aria-valuetext': `${delay} milliseconds`,
                      }}
                      value={[delay]}
                    />
                  </div>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="grid divide-y @2xl:grid-cols-2 @2xl:divide-x @2xl:divide-y-0">
          <section
            aria-labelledby="race-results"
            className="min-w-0 space-y-3 p-4 @xl:px-5"
          >
            <h3
              className="flex items-center gap-2 font-semibold"
              id="race-results"
            >
              <SearchIcon aria-hidden="true" className="size-4 text-primary" />
              Search results
            </h3>
            <form className="flex gap-2" onSubmit={handleSearch}>
              <label className="sr-only" htmlFor="race-query">
                Search products
              </label>
              <Input
                className="min-w-0"
                id="race-query"
                maxLength={60}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={lesson.playground.searchPlaceholder}
                type="search"
                value={query}
              />
              <Button
                disabled={!query.trim()}
                type="submit"
                variant="secondary"
              >
                Search
              </Button>
            </form>
            <RequestResults latest={latest} view={view} />
          </section>
          <section
            aria-labelledby="race-timeline"
            className="min-w-0 space-y-3 p-4 @xl:px-5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-2">
              <h3
                className="flex items-center gap-2 font-semibold"
                id="race-timeline"
              >
                <HistoryIcon
                  aria-hidden="true"
                  className="size-4 text-primary"
                />
                Request timeline
              </h3>
              <p className="text-xs text-muted-foreground">
                Oldest event first
              </p>
            </div>
            <RequestTimeline
              displayedRequestId={displayedRequestId}
              events={events}
            />
          </section>
        </div>
      </section>
    </Card>
  );
}
