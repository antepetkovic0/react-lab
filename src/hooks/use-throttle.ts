import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, intervalMs: number) {
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
}
