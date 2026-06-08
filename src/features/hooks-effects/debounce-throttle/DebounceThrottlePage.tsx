import {
  GaugeIcon,
  InfoIcon,
  ListFilterIcon,
  TimerResetIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { RouteBreadcrumbs } from "@/components/shared/route-breadcrumbs/RouteBreadcrumbs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { useThrottle } from "@/hooks/use-throttle";
import {
  concepts,
  debounceCode,
  products,
  searchPreviewCode,
  throttleCode,
} from "./debounce-throttle.data";
import { Meter } from "./Meter";

function DebounceThrottlePage() {
  const [query, setQuery] = useState("");
  const [sliderValue, setSliderValue] = useState(50);

  const debouncedQuery = useDebounce(query, 450);
  const throttledSliderValue = useThrottle(sliderValue, 350);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = debouncedQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) =>
      product.toLowerCase().includes(normalizedQuery),
    );
  }, [debouncedQuery]);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Debounce & Throttle
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Hooks & Effects
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Build two custom hooks for time-based updates. Debounce waits until
            rapid changes settle, while throttle lets updates through at a
            steady rate.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {concepts.map((concept) => {
          const Icon = concept.icon;

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={concept.title}
            >
              <div className="flex items-center gap-2">
                <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <h2 className="text-sm font-semibold">{concept.title}</h2>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {concept.description}
              </p>
              <p className="mt-3 text-xs font-medium text-muted-foreground">
                {concept.examples}
              </p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="min-h-[540px] gap-0 py-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <ListFilterIcon className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Example: Debounced Search
              </span>
            </div>
            <Badge variant="outline">450ms delay</Badge>
          </div>
          <CardContent className="space-y-5 p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="space-y-3">
                <label className="text-sm font-medium" htmlFor="product-search">
                  Search products
                </label>
                <Input
                  id="product-search"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try typing hook, router, search..."
                  value={query}
                />
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg border bg-muted/20 p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Raw input
                    </p>
                    <p className="mt-1 min-h-6 break-words text-sm font-semibold">
                      {query || "Empty"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-primary/30 bg-primary/5 p-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Debounced query
                    </p>
                    <p className="mt-1 min-h-6 break-words text-sm font-semibold text-primary">
                      {debouncedQuery || "Empty"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/20 p-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-sm font-semibold">Results</h2>
                  <Badge variant="secondary">
                    {filteredProducts.length} shown
                  </Badge>
                </div>
                <ul className="mt-3 space-y-2">
                  {filteredProducts.map((product) => (
                    <li
                      className="rounded-md border bg-background px-3 py-2 text-sm"
                      key={product}
                    >
                      {product}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="rounded-lg border bg-background p-4">
              <h2 className="text-sm font-semibold">
                What happens in this example
              </h2>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-md bg-muted/30 p-3 text-sm leading-6 text-muted-foreground">
                  Typing updates <code>query</code> immediately, so the input
                  never feels delayed.
                </div>
                <div className="rounded-md bg-muted/30 p-3 text-sm leading-6 text-muted-foreground">
                  The effect starts a timer. Each new keystroke cleans up the
                  old timer and starts a fresh one.
                </div>
                <div className="rounded-md bg-muted/30 p-3 text-sm leading-6 text-muted-foreground">
                  When typing pauses for 450ms, <code>debouncedQuery</code>{" "}
                  updates and the filtered list recalculates.
                </div>
              </div>
            </section>

            <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
              <code>{searchPreviewCode}</code>
            </pre>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TimerResetIcon className="size-4 text-primary" />
                useDebounce
              </CardTitle>
              <CardDescription>
                Return the latest value only after changes stop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{debounceCode}</code>
              </pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GaugeIcon className="size-4 text-primary" />
                useThrottle
              </CardTitle>
              <CardDescription>
                Return updates at most once per interval.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
                <code>{throttleCode}</code>
              </pre>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-muted-foreground">
                <div className="flex gap-2">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
                    <InfoIcon className="size-4" />
                  </span>
                  <p>
                    Use debounce when you only care about the final state after
                    the user finishes an action. Use throttle when you need
                    continuous feedback at a controlled, steady pace.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Throttle Demo</CardTitle>
          <CardDescription>
            Drag the slider quickly. The raw value follows every movement, while
            the throttled value catches up every 350ms.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <input
            aria-label="Throttle demo slider"
            className="w-full accent-primary"
            max="100"
            min="0"
            onChange={(event) => setSliderValue(Number(event.target.value))}
            type="range"
            value={sliderValue}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <Meter label="Raw slider value" value={sliderValue} />
            <Meter label="Throttled value" value={throttledSliderValue} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { DebounceThrottlePage };
