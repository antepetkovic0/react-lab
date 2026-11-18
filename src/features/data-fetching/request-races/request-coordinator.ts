import type { modes } from './request-races.data.ts';

export type SearchMode = (typeof modes)[number]['id'];

type SearchInput = { query: string; delay: number };
type SearchRequest = SearchInput & { id: number };
type SearchOutcome = { status: 'ready'; items: string[] } | { status: 'error' };
export type SearchView =
  | { status: 'idle' }
  | (({ status: 'loading' } | SearchOutcome) & { request: SearchRequest });

type RequestStatus = 'pending' | 'completed' | 'ignored' | 'aborted';

export type RequestEvent = {
  request: SearchRequest;
  status: RequestStatus;
  elapsed: number;
  failed?: boolean;
};

type Snapshot = {
  latest: SearchRequest | null;
  view: SearchView;
  events: RequestEvent[];
};

type Search = (
  query: string,
  delay: number,
  signal: AbortSignal,
) => Promise<string[]>;

const initialSnapshot: Snapshot = {
  latest: null,
  view: { status: 'idle' },
  events: [],
};

export function createRequestCoordinator(search: Search) {
  let snapshot = initialSnapshot;
  let raceTimer: ReturnType<typeof setTimeout> | undefined;
  let sequence = 0;
  let origin = 0;
  const active = new Map<number, AbortController>();
  const listeners = new Set<() => void>();

  function publish(next: Snapshot) {
    snapshot = next;
    for (const listener of listeners) listener();
  }

  function record(
    request: SearchRequest,
    status: RequestStatus,
    failed?: boolean,
  ): RequestEvent[] {
    return [
      ...snapshot.events,
      {
        request,
        status,
        failed,
        elapsed: Math.round(performance.now() - origin),
      },
    ];
  }

  async function launch(input: SearchInput, mode: SearchMode) {
    if (sequence === 0) origin = performance.now();
    const request = { ...input, id: ++sequence };
    const controller = new AbortController();

    if (mode === 'cancellation') {
      for (const older of active.values()) older.abort();
    }
    active.set(request.id, controller);
    publish({
      latest: request,
      view: { status: 'loading', request },
      events: record(request, 'pending'),
    });

    let outcome: SearchOutcome;
    try {
      outcome = {
        status: 'ready',
        items: await search(request.query, request.delay, controller.signal),
      };
    } catch {
      outcome = { status: 'error' };
    }

    // Reset can reuse IDs while an old promise is still settling.
    if (active.get(request.id) !== controller) return;
    active.delete(request.id);

    let status: RequestStatus = 'completed';
    if (controller.signal.aborted) {
      status = 'aborted';
    } else if (mode !== 'unprotected' && request !== snapshot.latest) {
      status = 'ignored';
    }

    publish({
      ...snapshot,
      view: status === 'completed' ? { ...outcome, request } : snapshot.view,
      events: record(request, status, outcome.status === 'error'),
    });
  }

  function clear() {
    clearTimeout(raceTimer);
    for (const controller of active.values()) controller.abort();
    active.clear();
    sequence = 0;
    publish(initialSnapshot);
  }

  return {
    getSnapshot: () => snapshot,
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    start(input: SearchInput, mode: SearchMode) {
      clearTimeout(raceTimer);
      return launch(input, mode);
    },
    runRace(
      slow: SearchInput,
      fast: SearchInput,
      gap: number,
      mode: SearchMode,
    ) {
      clear();
      void launch(slow, mode);
      raceTimer = setTimeout(() => void launch(fast, mode), gap);
    },
    clear,
  };
}
