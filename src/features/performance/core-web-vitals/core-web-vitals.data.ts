import {
  Clock3Icon,
  MousePointerClickIcon,
  MoveHorizontalIcon,
} from "lucide-react";

export const vitals = [
  {
    name: "LCP",
    label: "Largest Contentful Paint",
    target: "2.5s or less",
    icon: Clock3Icon,
    description:
      "How long it takes for the largest meaningful image or text block to appear in the viewport.",
    reactFocus:
      "Reduce render-blocking work, split routes, preload the hero image, and avoid delaying the first useful paint behind client-only data chains.",
    codeTips: [
      "Identify the LCP element -> metric.entries.at(-1)?.element",
      'Preload the LCP image -> <link rel="preload" as="image" href="..." fetchpriority="high">',
      "Use modern format (AVIF, WebP) together with srcset and sizes attributes",
      "Preload fonts -> <link rel='preload' href='...' as='font' type='font/woff2' crossorigin> together with font-display: swap",
      "Lazy-load below-the-fold route chunks and heavy widgets with React.lazy()",
      "Keep the initial Suspense fallback small and close to the final layout",
    ],
  },
  {
    name: "INP",
    label: "Interaction to Next Paint",
    target: "200ms or less",
    icon: MousePointerClickIcon,
    description:
      "How quickly the page responds visually after a user interaction like typing, tapping, or clicking.",
    reactFocus:
      "Keep event handlers light, defer expensive state updates, memoize costly derived data, and move non-urgent work out of the input path.",
    codeTips: [
      "Move expensive derived data into useMemo() when the inputs are stable",
      "Wrap non-urgent updates in startTransition() so input feedback can paint first",
      "Split large controlled forms so one keystroke does not re-render the whole page",
      "Debounce network writes and analytics work outside the immediate event handler",
    ],
  },
  {
    name: "CLS",
    label: "Cumulative Layout Shift",
    target: "0.1 or less",
    icon: MoveHorizontalIcon,
    description:
      "How much visible content unexpectedly moves after the page has already started rendering.",
    reactFocus:
      "Reserve space for images, ads, embeds, and skeletons so React updates do not push settled content around.",
    codeTips: [
      "Set width and height, or aspect-ratio, on images and media containers",
      "Match skeleton dimensions to the loaded component before data arrives",
      "Avoid inserting banners above existing content after the route has painted",
    ],
  },
];

export const observerCode = `function sendToConsole(metric: MetricType) {
    console.log("[web-vitals]", metric.name, {
      delta: metric.delta,
      entries: metric.entries,
      id: metric.id,
      navigationType: metric.navigationType,
      rating: metric.rating,
      value: metric.value,
    });
  }
  
  function reportWebVitals(onPerfEntry?: (metric: MetricType) => void) {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      // using dynamic import to avoid bundling web-vitals with the main bundle
      import("web-vitals").then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      });
    }
  }
  
  reportWebVitals(sendToConsole);
  `;
