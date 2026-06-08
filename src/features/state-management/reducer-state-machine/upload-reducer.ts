import type { UploadStatus } from "./reducer-state-machine.types";

export type UploadEvent =
  | { type: "SELECT_FILE"; fileName: string }
  | { type: "START" }
  | { type: "PROGRESS"; amount: number }
  | { type: "PAUSE" }
  | { type: "RESUME" }
  | { type: "FAIL"; message: string }
  | { type: "RETRY" }
  | { type: "CANCEL" }
  | { type: "RESET" };

type EventLogItem = {
  id: number;
  event: UploadEvent["type"];
  from: UploadStatus;
  to: UploadStatus;
  accepted: boolean;
  note: string;
};

type UploadState = {
  status: UploadStatus;
  fileName: string | null;
  progress: number;
  attempts: number;
  error: string | null;
  eventCount: number;
  log: EventLogItem[];
};

export const initialUploadState: UploadState = {
  status: "idle",
  fileName: null,
  progress: 0,
  attempts: 0,
  error: null,
  eventCount: 0,
  log: [],
};

export function uploadReducer(
  state: UploadState,
  event: UploadEvent,
): UploadState {
  switch (event.type) {
    case "SELECT_FILE": {
      if (state.status !== "idle") {
        return ignoreEvent(state, event, "Select a new file after reset.");
      }

      return recordEvent(
        state,
        event,
        {
          ...state,
          status: "ready",
          fileName: event.fileName,
          progress: 0,
          error: null,
        },
        true,
        "File selected. START is now valid.",
      );
    }

    case "START": {
      if (state.status !== "ready") {
        return ignoreEvent(state, event, "START only works from ready.");
      }

      return recordEvent(
        state,
        event,
        { ...state, status: "uploading", attempts: state.attempts + 1 },
        true,
        "Upload effect can begin ticking.",
      );
    }

    case "PROGRESS": {
      if (state.status !== "uploading") {
        return ignoreEvent(
          state,
          event,
          "Progress is ignored unless uploading.",
        );
      }

      const progress = Math.min(100, state.progress + event.amount);
      const status = progress === 100 ? "success" : "uploading";

      return recordEvent(
        state,
        event,
        { ...state, status, progress },
        true,
        progress === 100
          ? "Reached the terminal success state."
          : "Progress accepted.",
      );
    }

    case "PAUSE": {
      if (state.status !== "uploading") {
        return ignoreEvent(state, event, "PAUSE only works while uploading.");
      }

      return recordEvent(
        state,
        event,
        { ...state, status: "paused" },
        true,
        "Timer cleanup stops progress events.",
      );
    }

    case "RESUME": {
      if (state.status !== "paused") {
        return ignoreEvent(state, event, "RESUME only works from paused.");
      }

      return recordEvent(
        state,
        event,
        { ...state, status: "uploading" },
        true,
        "Upload effect starts again.",
      );
    }

    case "FAIL": {
      if (state.status !== "uploading") {
        return ignoreEvent(state, event, "FAIL only works while uploading.");
      }

      return recordEvent(
        state,
        event,
        { ...state, status: "error", error: event.message },
        true,
        "Moved to error with retry data preserved.",
      );
    }

    case "RETRY": {
      if (state.status !== "error") {
        return ignoreEvent(state, event, "RETRY only works from error.");
      }

      return recordEvent(
        state,
        event,
        {
          ...state,
          status: "uploading",
          progress: 0,
          attempts: state.attempts + 1,
          error: null,
        },
        true,
        "Retry restarts progress without selecting a file again.",
      );
    }

    case "CANCEL": {
      if (state.status !== "uploading" && state.status !== "paused") {
        return ignoreEvent(
          state,
          event,
          "CANCEL only works during an active upload.",
        );
      }

      return recordEvent(
        state,
        event,
        { ...initialUploadState, eventCount: state.eventCount, log: state.log },
        true,
        "Active upload cancelled and state returned to idle.",
      );
    }

    case "RESET": {
      if (state.status !== "success" && state.status !== "error") {
        return ignoreEvent(
          state,
          event,
          "RESET is reserved for terminal states.",
        );
      }

      return recordEvent(
        state,
        event,
        { ...initialUploadState, eventCount: state.eventCount, log: state.log },
        true,
        "Terminal state cleared.",
      );
    }
  }
}

function ignoreEvent(state: UploadState, event: UploadEvent, note: string) {
  return recordEvent(state, event, state, false, note);
}

function recordEvent(
  state: UploadState,
  event: UploadEvent,
  nextState: UploadState,
  accepted: boolean,
  note: string,
) {
  const nextCount = state.eventCount + 1;

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
  };
}
