import { Clock3Icon, GaugeIcon, TimerResetIcon } from "lucide-react";

export const products = [
  "React Query Planner",
  "Hook Timer",
  "Effect Cleanup Kit",
  "State Machine Notes",
  "Render Profiler",
  "Form Validation Map",
  "Router Breadcrumb Builder",
  "Search Result Cache",
];

export const concepts = [
  {
    title: "Debounce waits for quiet",
    icon: TimerResetIcon,
    description:
      "Debounce delays the function execution until a specific amount of time has passed since the last event.",
    examples: "Search input, autosave, validation after typing",
  },
  {
    title: "Throttle sets a rhythm",
    icon: GaugeIcon,
    description:
      "Throttle guarantees the function will execute at a regular, fixed interval as long as events are continuously firing.",
    examples: "Scroll position, resize, drag, pointer tracking",
  },
  {
    title: "Both rely on cleanup",
    icon: Clock3Icon,
    description:
      "Timers are effects. Clear the old timer when values change so stale work does not update the UI later.",
    examples: "clearTimeout inside the effect cleanup function",
  },
];

export const debounceCode = `function useDebounce<T>(value: T, delayMs: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const timeoutId = window.setTimeout(() => {
        setDebouncedValue(value);
      }, delayMs);
  
      return () => window.clearTimeout(timeoutId);
    }, [value, delayMs]);
  
    return debouncedValue;
  }`;

export const throttleCode = `function useThrottle<T>(value: T, intervalMs: number) {
    const [throttledValue, setThrottledValue] = useState(value);
    const lastUpdatedRef = useRef(0);
  
    useEffect(() => {
      const now = Date.now();
      const elapsed = now - lastUpdatedRef.current;
  
      if (elapsed >= intervalMs) {
        lastUpdatedRef.current = now;
        setThrottledValue(value);
        return;
      }
  
      const timeoutId = window.setTimeout(() => {
        lastUpdatedRef.current = Date.now();
        setThrottledValue(value);
      }, intervalMs - elapsed);
  
      return () => window.clearTimeout(timeoutId);
    }, [value, intervalMs]);
  
    return throttledValue;
  }`;

export const searchPreviewCode = `function ProductSearch() {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 400);
  
    const results = products.filter((product) =>
      product.toLowerCase().includes(debouncedQuery.toLowerCase()),
    );
  
    return (
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    );
  }`;
