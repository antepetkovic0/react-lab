import { createFileRoute } from "@tanstack/react-router";
import {
  ActivityIcon,
  BarChart3Icon,
  ChevronRightIcon,
  Clock3Icon,
  InfoIcon,
  MousePointerClickIcon,
  MoveHorizontalIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_dashboard/performance/core-web-vitals")(
  {
    component: CoreWebVitalsPage,
  },
);

const vitals = [
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

const observerCode = `function sendToConsole(metric: MetricType) {
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

function CoreWebVitalsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"
      >
        <span>Dashboard</span>
        <ChevronRightIcon className="size-3" />
        <span>Performance</span>
        <ChevronRightIcon className="size-3" />
        <span className="font-medium text-foreground">Core Web Vitals</span>
      </nav>

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Core Web Vitals
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Performance
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Learn how LCP, INP, and CLS translate raw browser timing into user
            experience signals, then connect each metric to practical React
            performance work.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {vitals.map((vital) => {
          const Icon = vital.icon;

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={vital.name}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold">{vital.name}</h2>
                    <p className="text-xs text-muted-foreground">
                      {vital.label}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{vital.target}</Badge>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {vital.description}
              </p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="min-h-[480px] gap-0 py-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <BarChart3Icon className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Metric-to-Fix Playbook
              </span>
            </div>
            <Badge variant="outline">Lab</Badge>
          </div>
          <CardContent className="space-y-4 p-4">
            {vitals.map((vital) => (
              <section
                className="rounded-lg border bg-muted/20 p-4"
                key={vital.name}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-sm font-semibold">
                    Improve {vital.name}
                  </h2>
                  <span className="text-xs font-medium text-muted-foreground">
                    Good target: {vital.target}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {vital.reactFocus}
                </p>
                <div className="mt-4 space-y-2">
                  <h3 className="text-xs font-semibold tracking-wide text-foreground uppercase">
                    Tips
                  </h3>
                  <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                    {vital.codeTips.map((tip) => (
                      <li className="flex gap-2" key={tip}>
                        <span
                          aria-hidden="true"
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                        />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ActivityIcon className="size-4 text-primary" />
                Browser Observer
              </CardTitle>
              <CardDescription>
                A small library example for reading performance entries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{observerCode}</code>
              </pre>
              <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-foreground">
                <div className="flex gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
                    <InfoIcon className="size-4" />
                  </span>
                  <div className="space-y-2 text-muted-foreground">
                    <p>
                      Use <code>navigator.sendBeacon(url, body)</code> when you
                      want to send metrics to your own analytics endpoint
                      without blocking page unload.
                    </p>
                    <p>
                      Use <code>window.gtag</code> when you want to forward the
                      same metrics to Google Analytics.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
