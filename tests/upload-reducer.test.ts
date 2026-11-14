import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  initialUploadState,
  uploadReducer,
} from '../src/features/state-management/reducer-state-machine/upload-reducer.ts';

function startUpload() {
  const ready = uploadReducer(initialUploadState, {
    type: 'SELECT_FILE',
    fileName: 'lesson.pdf',
  });
  return uploadReducer(ready, { type: 'START' });
}

test('an upload requires a selected file before it can start', () => {
  const result = uploadReducer(initialUploadState, { type: 'START' });
  assert.equal(result.status, 'idle');
  assert.equal(result.attempts, 0);
  assert.equal(result.log[0].accepted, false);
  assert.equal(initialUploadState.eventCount, 0);
});

test('paused uploads ignore progress and resume from the previous value', () => {
  const uploading = uploadReducer(startUpload(), {
    type: 'PROGRESS',
    amount: 40,
  });
  const paused = uploadReducer(uploading, { type: 'PAUSE' });
  const ignored = uploadReducer(paused, { type: 'PROGRESS', amount: 20 });
  assert.equal(ignored.status, 'paused');
  assert.equal(ignored.progress, 40);
  assert.equal(ignored.log[0].accepted, false);
  const resumed = uploadReducer(ignored, { type: 'RESUME' });
  assert.equal(resumed.status, 'uploading');
  assert.equal(resumed.progress, 40);
});

test('retry preserves the file, clears the error, and starts a new attempt', () => {
  const progressed = uploadReducer(startUpload(), {
    type: 'PROGRESS',
    amount: 40,
  });
  const failed = uploadReducer(progressed, {
    type: 'FAIL',
    message: 'Network interrupted',
  });
  const retried = uploadReducer(failed, { type: 'RETRY' });
  assert.equal(retried.status, 'uploading');
  assert.equal(retried.fileName, 'lesson.pdf');
  assert.equal(retried.error, null);
  assert.equal(retried.progress, 0);
  assert.equal(retried.attempts, 2);
});

test('completion clamps progress and requires reset before selecting another file', () => {
  const complete = uploadReducer(startUpload(), {
    type: 'PROGRESS',
    amount: 125,
  });
  assert.equal(complete.status, 'success');
  assert.equal(complete.progress, 100);
  const ignored = uploadReducer(complete, {
    type: 'SELECT_FILE',
    fileName: 'another.pdf',
  });
  assert.equal(ignored.fileName, 'lesson.pdf');
  assert.equal(ignored.log[0].accepted, false);
  const reset = uploadReducer(ignored, { type: 'RESET' });
  assert.equal(reset.status, 'idle');
  assert.equal(reset.fileName, null);
  assert.equal(reset.progress, 0);
  assert.equal(reset.eventCount, ignored.eventCount + 1);
});

test('cancelling an active upload clears its data while retaining recent history', () => {
  const active = uploadReducer(startUpload(), { type: 'PAUSE' });
  const cancelled = uploadReducer(active, { type: 'CANCEL' });
  assert.equal(cancelled.status, 'idle');
  assert.equal(cancelled.fileName, null);
  assert.equal(cancelled.attempts, 0);
  assert.equal(cancelled.log[0].event, 'CANCEL');
  let state = cancelled;
  for (let index = 0; index < 10; index++) {
    state = uploadReducer(state, { type: 'START' });
  }
  assert.equal(state.log.length, 7);
  assert.equal(state.log[0].id, state.eventCount);
});
