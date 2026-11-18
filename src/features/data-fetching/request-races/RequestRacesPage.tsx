import { ArrowUpRightIcon } from 'lucide-react';
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RequestRacePlayground } from './RequestRacePlayground';
import {
  concepts,
  exampleDescription,
  examples,
  lesson,
  references,
  strategyGuide,
} from './request-races.data';

export function RequestRacesPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <header className="max-w-3xl space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            {lesson.title}
          </h1>
          <Badge className="bg-primary/10 text-primary" variant="outline">
            {lesson.section}
          </Badge>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          {lesson.description}
        </p>
      </header>

      <RequestRacePlayground />

      <section aria-labelledby="race-strategies" className="space-y-3">
        <h2 className="text-lg font-semibold" id="race-strategies">
          {strategyGuide.title}
        </h2>
        <Card className="py-0">
          <table
            aria-labelledby="race-strategies"
            className="w-full table-fixed text-sm"
          >
            <thead className="border-b bg-muted/40">
              <tr>
                <th
                  className="w-[46%] px-3 py-2 text-left font-semibold sm:px-4"
                  scope="col"
                >
                  {strategyGuide.columns.scenario}
                </th>
                <th
                  className="px-3 py-2 text-left font-semibold sm:px-4"
                  scope="col"
                >
                  {strategyGuide.columns.strategy}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {strategyGuide.rows.map(({ scenario, strategy, reason }) => (
                <tr className="align-top" key={scenario}>
                  <th
                    className="px-3 py-3 text-left font-medium wrap-anywhere sm:px-4"
                    scope="row"
                  >
                    {scenario}
                  </th>
                  <td className="space-y-1 px-3 py-3 wrap-anywhere sm:px-4">
                    <p className="font-semibold text-primary">{strategy}</p>
                    <p className="text-muted-foreground">{reason}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </section>

      <section aria-labelledby="race-concepts" className="space-y-3">
        <h2 className="text-lg font-semibold" id="race-concepts">
          What the race shows
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {concepts.map(({ title, description }) => (
            <Card className="gap-1" key={title}>
              <CardHeader>
                <h3 className="text-sm font-semibold">{title}</h3>
              </CardHeader>
              <CardContent className="text-sm leading-6 text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="race-examples" className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold" id="race-examples">
            Effect examples
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            {exampleDescription}
          </p>
        </div>
        <div className="grid gap-3 xl:grid-cols-3">
          {examples.map(({ title, code }) => (
            <Card className="min-w-0 gap-0 py-0" key={title}>
              <h3 className="border-b px-4 py-3 text-sm font-semibold">
                {title}
              </h3>
              <pre className="flex-1 overflow-x-auto bg-muted/40 p-4 text-xs leading-5">
                <code>{code}</code>
              </pre>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="race-references" className="space-y-2">
        <h2 className="text-sm font-semibold" id="race-references">
          Official references
        </h2>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {references.map(({ href, label }) => (
            <li key={href}>
              <a
                className="inline-flex items-center gap-1 rounded-sm text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                href={href}
              >
                {label}
                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="size-3.5 shrink-0"
                />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
