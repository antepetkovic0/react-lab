import { getLabsBySection } from "@/content/labs";

export const overview = {
  description:
    "Learn how hooks model state, refs, memoized values, subscriptions, and external synchronization.",
  eyebrow: "React Runtime",
  title: "Hooks & Effects",
  topics: [
    {
      title: "useState",
      description: "Store values that should trigger a render.",
    },
    {
      title: "useEffect",
      description: "Synchronize with timers, browser APIs, and servers.",
    },
    {
      title: "useRef",
      description: "Keep mutable values without causing renders.",
    },
    {
      title: "useReducer",
      description: "Move complex state transitions into one function.",
    },
    {
      title: "Memo hooks",
      description: "Reuse derived values and stable callbacks carefully.",
    },
    {
      title: "Custom hooks",
      description: "Extract reusable behavior behind a clear API.",
    },
  ],
};

export const labs = getLabsBySection("hooks-effects");
