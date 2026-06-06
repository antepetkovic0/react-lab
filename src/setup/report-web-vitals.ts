import type { MetricType } from "web-vitals";

export function sendToAnalytics(metric: MetricType) {
  const body = JSON.stringify({
    id: metric.id,
    navigationType: metric.navigationType,
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
  });

  const url = import.meta.env.VITE_WEB_VITALS_URL;

  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body);
  }
}

export function sendToConsole(metric: MetricType) {
  console.log("[web-vitals]", metric.name, {
    delta: metric.delta,
    entries: metric.entries,
    id: metric.id,
    navigationType: metric.navigationType,
    rating: metric.rating,
    value: metric.value,
  });
}

export function reportWebVitals(onPerfEntry?: (metric: MetricType) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry);
      onINP(onPerfEntry);
      onFCP(onPerfEntry);
      onLCP(onPerfEntry);
      onTTFB(onPerfEntry);
    });
  }
}
