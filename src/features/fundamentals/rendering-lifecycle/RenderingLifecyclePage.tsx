import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  InfoIcon,
  Layers3Icon,
} from 'lucide-react'
import { useState } from 'react'
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  fiberNotes,
  impureRenderCode,
  lifecycleStages,
  readingLinks,
  renderPurityCode,
  renderTriggers,
  scenarios,
  updateFlowCode,
} from './rendering-lifecycle.data'

type CodeBlockProps = {
  code: string
  title: string
  description: string
}

function CodeBlock({ code, description, title }: CodeBlockProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-xs leading-6">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

function RenderingLifecyclePage() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(
    scenarios[0]?.id ?? '',
  )
  const selectedScenario =
    scenarios.find((scenario) => scenario.id === selectedScenarioId) ??
    scenarios[0]

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Rendering Lifecycle
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Fundamentals
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Build a precise mental model for how React requests work, calls
            components, commits DOM changes, and hands the result to the browser
            to paint.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {lifecycleStages.map((stage, index) => {
          const Icon = stage.icon
          const isLastStage = index === lifecycleStages.length - 1

          return (
            <article
              className="relative rounded-lg border bg-background p-4"
              key={stage.title}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                {!isLastStage ? (
                  <ArrowRightIcon className="mt-2 hidden size-4 text-muted-foreground lg:block" />
                ) : null}
              </div>
              <div className="mt-4 space-y-2">
                <Badge variant="secondary">{stage.title}</Badge>
                <h2 className="text-sm font-semibold">{stage.label}</h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {stage.description}
                </p>
              </div>
            </article>
          )
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="gap-0 py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Lifecycle Explorer</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Pick a common update and trace the work through each phase.
              </p>
            </div>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Concept preview
            </Badge>
          </div>
          <CardContent className="space-y-4 p-4">
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
              {scenarios.map((scenario) => {
                const isSelected = scenario.id === selectedScenario.id

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'bg-background hover:bg-muted/50'
                    }`}
                    key={scenario.id}
                    onClick={() => setSelectedScenarioId(scenario.id)}
                    type="button"
                  >
                    <span className="font-medium">{scenario.title}</span>
                  </button>
                )
              })}
            </div>

            <div className="grid gap-3 lg:grid-cols-4">
              {[
                ['Trigger', selectedScenario.trigger],
                ['Render', selectedScenario.render],
                ['Commit', selectedScenario.commit],
                ['Paint', selectedScenario.paint],
              ].map(([label, copy]) => (
                <section
                  className="rounded-lg border bg-muted/20 p-3"
                  key={label}
                >
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">
                    {label}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {copy}
                  </p>
                </section>
              ))}
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Key idea:
              </strong>{' '}
              {selectedScenario.insight}
            </div>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="size-4 text-primary" />
                What triggers renders?
              </CardTitle>
              <CardDescription>
                Most renders begin from one of these situations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {renderTriggers.map((trigger) => {
                  const Icon = trigger.icon

                  return (
                    <li className="flex gap-3" key={trigger.title}>
                      <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-primary">
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{trigger.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                          {trigger.description}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Phase Outputs</CardTitle>
              <CardDescription>
                Each phase produces a different kind of result.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {lifecycleStages.map((stage) => (
                  <li className="rounded-md bg-muted/30 p-3" key={stage.title}>
                    <span className="font-medium text-foreground">
                      {stage.title}:
                    </span>{' '}
                    {stage.output}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <CodeBlock
          code={renderPurityCode}
          description="This render can run more than once because it only calculates output from inputs."
          title="Pure render"
        />
        <CodeBlock
          code={impureRenderCode}
          description="Changing external values during render makes repeated or interrupted renders unsafe."
          title="Impure render"
        />
        <CodeBlock
          code={updateFlowCode}
          description="A state setter requests a future render; it does not rewrite the current snapshot."
          title="State snapshot"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers3Icon className="size-4 text-primary" />A Small Fiber
              Mental Model
            </CardTitle>
            <CardDescription>
              Fiber is React's internal work structure, not a public API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
            <p>
              Think of a React element as the description returned by your
              component. Think of a fiber as React's internal record for doing
              work on one part of that tree.
            </p>
            <p>
              During render, React can prepare a new set of fibers that
              represents the next UI. During commit, React applies the finished
              work to the host environment, such as the browser DOM.
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {fiberNotes.map((note) => (
                <div className="rounded-lg border bg-muted/20 p-3" key={note}>
                  <CheckCircle2Icon className="mb-2 size-4 text-primary" />
                  <p>{note}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Further Reading</CardTitle>
            <CardDescription>
              Official React pages that back up this lesson.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {readingLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="flex items-center justify-between gap-3 rounded-md border bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50"
                    href={link.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {link.title}
                    <ExternalLinkIcon className="size-3.5 text-muted-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export { RenderingLifecyclePage }
