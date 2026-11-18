import assert from 'node:assert/strict';
import test from 'node:test';
import { createRequestCoordinator } from '../src/features/data-fetching/request-races/request-coordinator.ts';
import { simulateSearch } from '../src/features/data-fetching/request-races/simulate-search.ts';

function deferredSearch() {
  const requests: Array<{
    signal: AbortSignal;
    resolve: (items: string[]) => void;
    reject: (error: Error) => void;
  }> = [];

  const coordinator = createRequestCoordinator(
    (_query, _delay, signal) =>
      new Promise((resolve, reject) => {
        requests.push({ signal, resolve, reject });
      }),
  );

  return { coordinator, requests };
}

test('the unprotected search lets an older response overwrite newer results', async () => {
  const { coordinator, requests } = deferredSearch();
  const slow = coordinator.start({ query: 'tea', delay: 2000 }, 'unprotected');
  const fast = coordinator.start(
    { query: 'coffee', delay: 500 },
    'unprotected',
  );

  requests[1].resolve(['Cold Brew Coffee']);
  await fast;
  assert.deepEqual(coordinator.getSnapshot().view, {
    status: 'ready',
    request: { id: 2, query: 'coffee', delay: 500 },
    items: ['Cold Brew Coffee'],
  });

  requests[0].resolve(['Mint Tea']);
  await slow;
  const { events, latest, view } = coordinator.getSnapshot();
  assert.equal(latest?.id, 2);
  assert.deepEqual(view, {
    status: 'ready',
    request: { id: 1, query: 'tea', delay: 2000 },
    items: ['Mint Tea'],
  });
  assert.deepEqual(
    events.map(({ request, status }) => [request.id, status]),
    [
      [1, 'pending'],
      [2, 'pending'],
      [2, 'completed'],
      [1, 'completed'],
    ],
  );
});

test('the guard preserves the newer result after the older request finishes', async () => {
  const { coordinator, requests } = deferredSearch();
  const slow = coordinator.start({ query: 'tea', delay: 2000 }, 'guard');
  const fast = coordinator.start({ query: 'coffee', delay: 500 }, 'guard');

  requests[1].resolve(['Cold Brew Coffee']);
  await fast;
  const current = coordinator.getSnapshot().view;
  requests[0].resolve(['Mint Tea']);
  await slow;

  assert.equal(requests[0].signal.aborted, false);
  assert.equal(coordinator.getSnapshot().view, current);
  assert.equal(coordinator.getSnapshot().events.at(-1)?.status, 'ignored');
});

test('the guard protects current loading and error from stale success and failure', async () => {
  const { coordinator, requests } = deferredSearch();
  const olderSuccess = coordinator.start(
    { query: 'tea', delay: 2000 },
    'guard',
  );
  const olderFailure = coordinator.start(
    { query: 'fail', delay: 1000 },
    'guard',
  );
  const newest = coordinator.start({ query: 'fail', delay: 500 }, 'guard');

  const loading = coordinator.getSnapshot().view;
  assert.equal(loading.status, 'loading');
  requests[1].reject(new Error('Older failure'));
  await olderFailure;
  assert.equal(coordinator.getSnapshot().view, loading);
  assert.equal(coordinator.getSnapshot().events.at(-1)?.status, 'ignored');

  requests[2].reject(new Error('Current failure'));
  await newest;
  const currentError = coordinator.getSnapshot().view;
  assert.equal(currentError.status, 'error');
  requests[0].resolve(['Mint Tea']);
  await olderSuccess;
  assert.equal(coordinator.getSnapshot().view, currentError);
});

test('cancellation stops the older simulator timer and leaves the newer search loading', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const coordinator = createRequestCoordinator(simulateSearch);
  const older = coordinator.start(
    { query: 'fail', delay: 1000 },
    'cancellation',
  );
  const newer = coordinator.start(
    { query: 'coffee', delay: 500 },
    'cancellation',
  );
  await older;

  assert.equal(coordinator.getSnapshot().events.at(-1)?.status, 'aborted');
  assert.equal(coordinator.getSnapshot().view.status, 'loading');
  t.mock.timers.tick(500);
  await newer;
  t.mock.timers.tick(500);

  const { events, view } = coordinator.getSnapshot();
  assert.equal(events.length, 4);
  assert.deepEqual(view, {
    status: 'ready',
    request: { id: 2, query: 'coffee', delay: 500 },
    items: ['Cold Brew Coffee', 'Espresso Coffee', 'Vanilla Coffee'],
  });
});

test('the simulator rejects with the reason of an already-aborted signal', async () => {
  const reason = new Error('Stopped');
  await assert.rejects(
    simulateSearch('tea', 0, AbortSignal.abort(reason)),
    (error) => error === reason,
  );
});

test('Run race launches the later search after the gap and it finishes first', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const coordinator = createRequestCoordinator(simulateSearch);
  coordinator.runRace(
    { query: 'tea', delay: 2000 },
    { query: 'coffee', delay: 500 },
    200,
    'unprotected',
  );
  assert.equal(coordinator.getSnapshot().latest?.query, 'tea');
  t.mock.timers.tick(200);
  assert.equal(coordinator.getSnapshot().latest?.query, 'coffee');

  t.mock.timers.tick(500);
  await Promise.resolve();
  assert.equal(
    coordinator.getSnapshot().events.at(-1)?.request.query,
    'coffee',
  );
  t.mock.timers.tick(1300);
  await Promise.resolve();
  assert.equal(coordinator.getSnapshot().events.at(-1)?.request.query, 'tea');
});

test('reset aborts active work, clears the scheduled race, and drops late results', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const { coordinator, requests } = deferredSearch();
  coordinator.runRace(
    { query: 'tea', delay: 2000 },
    { query: 'coffee', delay: 500 },
    200,
    'unprotected',
  );
  coordinator.clear();
  assert.equal(requests[0].signal.aborted, true);

  const current = coordinator.start(
    { query: 'moon', delay: 500 },
    'unprotected',
  );
  t.mock.timers.tick(200);
  assert.equal(requests.length, 2);
  requests[0].resolve(['Mint Tea']);
  await Promise.resolve();
  assert.equal(coordinator.getSnapshot().events.length, 1);
  assert.equal(coordinator.getSnapshot().view.status, 'loading');

  requests[1].resolve([]);
  await current;
  assert.deepEqual(coordinator.getSnapshot().view, {
    status: 'ready',
    request: { id: 1, query: 'moon', delay: 500 },
    items: [],
  });
});
