export const errorQuery = 'fail';

export const lesson = {
  title: 'Request Races & Cancellation',
  section: 'Data Fetching',
  description:
    'A search you sent first can finish last. Run the same pair of searches in three modes and see which response ends up on screen.',
  playground: {
    title: 'Search playground',
    description: 'Run the preset race, then switch modes and run it again.',
    searchPlaceholder: `Try tea, moon, or ${errorQuery}…`,
    emptyTimeline: 'Run a race or send a search to see requests appear here.',
    idleResults: 'Your search results will appear here.',
    noResults: 'No matching products.',
    error: 'The simulated service could not complete this search.',
    stale: 'An older response replaced the current search state.',
  },
};

export const modes = [
  {
    id: 'unprotected',
    title: 'Unprotected',
    description: 'Intentionally broken. Every response can update the UI.',
  },
  {
    id: 'guard',
    title: 'Stale-response guard',
    description:
      'Older work finishes, but only the latest request updates the UI.',
  },
  {
    id: 'cancellation',
    title: 'Cancellation',
    description: 'A new search aborts any older search still running.',
  },
] as const;

export const race = {
  slow: { query: 'tea', initial: 2000, min: 1400, max: 3200 },
  fast: { query: 'coffee', initial: 500, min: 300, max: 800 },
  gap: 200,
};

export const products = [
  'Chamomile Tea',
  'Jasmine Green Tea',
  'Mint Tea',
  'Cold Brew Coffee',
  'Espresso Coffee',
  'Vanilla Coffee',
  'Dark Chocolate',
];

export const timelineNotes = {
  pending: 'Sent',
  completed: 'Updated the UI',
  displayed: 'Response currently shown',
  ignored: 'Finished without updating the UI',
  aborted: 'Stopped before updating the UI',
  error: 'Showed an error',
  displayedError: 'Error currently shown',
  ignoredError: 'Failed without updating the UI',
};

export const concepts = [
  {
    title: 'Debounce controls when requests start',
    description:
      'Debouncing reduces how often you send a request. If two searches get through, either can still finish first because each takes a different amount of time.',
  },
  {
    title: 'A guard controls which response can update state',
    description:
      'An ignored request still runs to completion. Check that a response is current before updating results, showing an error, or clearing loading state.',
  },
  {
    title: 'Cancellation stops work that honors the signal',
    description:
      'AbortController signals the client to stop. An abort is expected when a request is superseded, so skip the error UI. A server may still finish processing a request it already received.',
  },
  {
    title: 'Effect cleanup handles replacement and unmount',
    description:
      'React runs cleanup before setting up a replacement effect with changed dependencies, and again on unmount. Use cleanup to invalidate the old request or abort it.',
  },
];

export const strategyGuide = {
  title: 'When to use each approach',
  columns: { scenario: 'Scenario', strategy: 'Use' },
  rows: [
    {
      scenario: 'A new search replaces a request used only by this view.',
      strategy: 'Cancellation',
      reason: 'Stop obsolete client work if the request supports abort.',
    },
    {
      scenario:
        'Another view needs the request, or its result can fill a cache.',
      strategy: 'Stale-response guard',
      reason:
        'Let the shared work finish and keep the current view up to date.',
    },
    {
      scenario: 'A third-party API returns a promise without abort support.',
      strategy: 'Stale-response guard',
      reason: 'Ignore late results and errors in the current view.',
    },
    {
      scenario:
        'An abortable fetch is followed by async work that can still finish.',
      strategy: 'Both',
      reason:
        'Abort the fetch and check that the request is still current before updating the UI.',
    },
  ],
};

export const examples = [
  {
    title: 'Before · Unprotected',
    code: `useEffect(() => {
  setView({ status: 'loading' });
  search(query).then(
    items => setView({ status: 'ready', items }),
    error => setView({ status: 'error', error }),
  );
}, [query]);`,
  },
  {
    title: 'After · Stale-response guard',
    code: `useEffect(() => {
  let current = true;
  setView({ status: 'loading' });
  search(query).then(
    items => {
      if (current) setView({ status: 'ready', items });
    },
    error => {
      if (current) setView({ status: 'error', error });
    },
  );
  return () => { current = false; };
}, [query]);`,
  },
  {
    title: 'After · Cancellation',
    code: `useEffect(() => {
  const controller = new AbortController();
  const { signal } = controller;
  setView({ status: 'loading' });
  search(query, { signal }).then(
    items => {
      if (!signal.aborted) setView({ status: 'ready', items });
    },
    error => {
      if (!signal.aborted) setView({ status: 'error', error });
    },
  );
  return () => controller.abort();
}, [query]);`,
  },
];

export const exampleDescription =
  'These versions run when the query changes. In the playground, searches start through button and form events.';

export const references = [
  {
    label: 'React · Fetching data with Effects',
    href: 'https://react.dev/reference/react/useEffect#fetching-data-with-effects',
  },
  {
    label: 'React · Synchronizing with Effects',
    href: 'https://react.dev/learn/synchronizing-with-effects#fetching-data',
  },
  {
    label: 'MDN · Implementing an abortable API',
    href: 'https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#implementing_an_abortable_api',
  },
  {
    label: 'MDN · Debounce',
    href: 'https://developer.mozilla.org/en-US/docs/Glossary/Debounce',
  },
];
