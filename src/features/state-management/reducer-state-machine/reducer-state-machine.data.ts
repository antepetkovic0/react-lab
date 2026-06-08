import { CircleDotIcon, GitBranchIcon, ShieldAlertIcon } from "lucide-react";
import type { UploadStatus } from "./reducer-state-machine.types";

export const concepts = [
  {
    title: "One mode at a time",
    icon: CircleDotIcon,
    description:
      "The upload can be idle, ready, uploading, paused, successful, or failed. It cannot be all of those at once.",
  },
  {
    title: "Events describe intent",
    icon: GitBranchIcon,
    description:
      "The UI dispatches events such as START, PAUSE, and RETRY instead of reaching into separate setters.",
  },
  {
    title: "Effects stay outside",
    icon: ShieldAlertIcon,
    description:
      "The reducer returns the next state. The timer that simulates upload progress runs in an effect.",
  },
];

export const sampleFiles = [
  "react-lab-notes.pdf",
  "state-chart-sketch.png",
  "upload-demo.zip",
];

export const transitionRows = [
  ["idle", "SELECT_FILE", "ready"],
  ["ready", "START", "uploading"],
  ["uploading", "PROGRESS", "uploading or success"],
  ["uploading", "PAUSE", "paused"],
  ["paused", "RESUME", "uploading"],
  ["uploading", "FAIL", "error"],
  ["error", "RETRY", "uploading"],
  ["uploading or paused", "CANCEL", "idle"],
  ["success or error", "RESET", "idle"],
];

export const reducerCode = `type UploadState =
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
  }`;

export const statusMeta: Record<
  UploadStatus,
  {
    label: string;
    description: string;
    className: string;
  }
> = {
  idle: {
    label: "Idle",
    description: "No file has been selected yet.",
    className: "border-muted-foreground/20 bg-muted/40 text-muted-foreground",
  },
  ready: {
    label: "Ready",
    description: "A file is selected and waiting to start.",
    className: "border-sky-200 bg-sky-50 text-sky-700",
  },
  uploading: {
    label: "Uploading",
    description: "Progress events are allowed while the effect is running.",
    className: "border-primary/30 bg-primary/10 text-primary",
  },
  paused: {
    label: "Paused",
    description: "Progress is frozen until RESUME is dispatched.",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  success: {
    label: "Success",
    description: "The upload reached 100%. Progress events are ignored now.",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  error: {
    label: "Error",
    description: "The upload failed. Retry or reset to move forward.",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
};
