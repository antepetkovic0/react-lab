import { ActivityIcon, BarChart3Icon, InfoIcon } from "lucide-react";
import { RouteBreadcrumbs } from "@/components/shared/route-breadcrumbs/RouteBreadcrumbs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { observerCode, vitals } from "./core-web-vitals.data";

function CoreWebVitalsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

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

export { CoreWebVitalsPage };
