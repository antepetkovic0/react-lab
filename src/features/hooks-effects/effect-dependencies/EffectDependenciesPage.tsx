import { CheckCircle2Icon, ExternalLinkIcon, RefreshCwIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { RouteBreadcrumbs } from '@/components/shared/route-breadcrumbs/RouteBreadcrumbs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  dependencyArrayCode,
  dependencyPitfalls,
  mentalModelCards,
  objectInsideEffectCode,
  objectIsExamples,
  readingLinks,
  stabilizationChoices,
  unnecessaryObjectCode,
} from './effect-dependencies.data'

type DependencyComparison = {
  label: string
  previous: string
  next: string
  changed: boolean
  note: string
}

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

function EffectDependenciesPage() {
  const [roomId, setRoomId] = useState('general')
  const [reuseObject, setReuseObject] = useState(false)
  const [reuseArray, setReuseArray] = useState(false)
  const [reuseFunction, setReuseFunction] = useState(false)

  const previousObject = useMemo(
    () => ({ roomId: 'general', reconnect: true }),
    [],
  )
  const previousArray = useMemo(() => ['general', 'music'], [])
  const previousFunction = useCallback(() => 'connect', [])

  const nextObject = reuseObject
    ? previousObject
    : { roomId: 'general', reconnect: true }
  const nextArray = reuseArray ? previousArray : ['general', 'music']
  const nextFunction = reuseFunction ? previousFunction : () => 'connect'

  const comparisons: DependencyComparison[] = [
    {
      label: 'Primitive string',
      previous: 'const previousRoomId = "general"',
      next: `const nextRoomId = "${roomId}"`,
      changed: !Object.is('general', roomId),
      note: 'Strings compare by value, so the Effect only reruns when the text changes.',
    },
    {
      label: 'Object literal',
      previous: 'const previousObject = { roomId: "general", reconnect: true }',
      next: reuseObject
        ? 'const nextObject = previousObject'
        : 'const nextObject = { roomId: "general", reconnect: true }',
      changed: !Object.is(previousObject, nextObject),
      note: 'Matching object contents do not matter if the reference is new.',
    },
    {
      label: 'Array literal',
      previous: 'const previousArray = ["general", "music"]',
      next: reuseArray
        ? 'const nextArray = previousArray'
        : 'const nextArray = ["general", "music"]',
      changed: !Object.is(previousArray, nextArray),
      note: 'Arrays are objects too, so React compares the array identity.',
    },
    {
      label: 'Function value',
      previous: 'const previousFn = () => "connect"',
      next: reuseFunction
        ? 'const nextFn = previousFn'
        : 'const nextFn = () => "connect"',
      changed: !Object.is(previousFunction, nextFunction),
      note: 'Functions declared during render are new values unless their identity is stabilized.',
    },
  ]

  const changedCount = comparisons.filter(
    (comparison) => comparison.changed,
  ).length
  const effectWillRun = changedCount > 0

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Effect Dependencies & Referential Equality
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Hooks & Effects
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Build a precise mental model for why an Effect runs, why inline
            objects and functions feel unstable, and how React compares each
            dependency between commits.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-4">
        {mentalModelCards.map((card) => {
          const Icon = card.icon

          return (
            <article
              className="rounded-lg border bg-background p-4"
              key={card.title}
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="size-4" />
              </span>
              <h2 className="mt-4 text-sm font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {card.description}
              </p>
            </article>
          )
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <Card className="gap-0 py-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold">Dependency Inspector</h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Compare the previous render to the next render using the same
                Object.is rule React uses for dependencies.
              </p>
            </div>
            <Badge
              className={
                effectWillRun
                  ? 'border-primary/30 bg-primary/10 text-primary'
                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700'
              }
              variant="outline"
            >
              {effectWillRun ? `${changedCount} changed` : 'all stable'}
            </Badge>
          </div>
          <CardContent className="space-y-5 p-4">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="space-y-3">
                <label className="text-sm font-medium" htmlFor="room-id">
                  Primitive roomId
                </label>
                <Input
                  id="room-id"
                  onChange={(event) => setRoomId(event.target.value)}
                  value={roomId}
                />
                <p className="text-xs leading-5 text-muted-foreground">
                  Change this away from general to make the primitive string
                  dependency change by value.
                </p>
              </div>

              <div className="grid gap-2">
                {[
                  {
                    label: 'Reuse object identity',
                    pressed: reuseObject,
                    onClick: () => setReuseObject((value) => !value),
                  },
                  {
                    label: 'Reuse array identity',
                    pressed: reuseArray,
                    onClick: () => setReuseArray((value) => !value),
                  },
                  {
                    label: 'Reuse function identity',
                    pressed: reuseFunction,
                    onClick: () => setReuseFunction((value) => !value),
                  },
                ].map((control) => (
                  <Button
                    aria-pressed={control.pressed}
                    className="justify-start"
                    key={control.label}
                    onClick={control.onClick}
                    type="button"
                    variant={control.pressed ? 'default' : 'outline'}
                  >
                    {control.pressed ? (
                      <CheckCircle2Icon className="size-4" />
                    ) : (
                      <RefreshCwIcon className="size-4" />
                    )}
                    {control.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border">
              <div className="grid grid-cols-[1.1fr_1fr_1fr_92px] gap-3 border-b bg-muted/40 px-3 py-2 text-xs font-semibold text-muted-foreground">
                <span>Dependency</span>
                <span>Previous</span>
                <span>Next</span>
                <span>Object.is</span>
              </div>
              <div className="divide-y">
                {comparisons.map((comparison) => (
                  <section
                    className="grid gap-3 px-3 py-3 text-sm md:grid-cols-[1.1fr_1fr_1fr_92px]"
                    key={comparison.label}
                  >
                    <div>
                      <p className="font-medium">{comparison.label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {comparison.note}
                      </p>
                    </div>
                    <code className="min-w-0 overflow-x-auto rounded-md bg-muted px-2 py-1 text-xs">
                      {comparison.previous}
                    </code>
                    <code className="min-w-0 overflow-x-auto rounded-md bg-muted px-2 py-1 text-xs">
                      {comparison.next}
                    </code>
                    <div>
                      <Badge
                        className={
                          comparison.changed
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-emerald-500/10 text-emerald-700'
                        }
                        variant="outline"
                      >
                        {comparison.changed ? 'false' : 'true'}
                      </Badge>
                    </div>
                  </section>
                ))}
              </div>
            </div>

            <div
              className={`rounded-lg border p-4 text-sm leading-6 ${
                effectWillRun
                  ? 'border-primary/20 bg-primary/5 text-muted-foreground'
                  : 'border-emerald-500/20 bg-emerald-500/5 text-muted-foreground'
              }`}
            >
              <strong className="font-semibold text-foreground">
                Effect result:
              </strong>{' '}
              {effectWillRun
                ? 'At least one dependency changed, so React would run the previous cleanup and then run setup with the new values.'
                : 'Every dependency is Object.is-equal to its previous value, so React would skip this Effect for this commit.'}
            </div>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Object.is Snapshots</CardTitle>
              <CardDescription>
                The comparison is shallow and item-by-item.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {objectIsExamples.map((example) => (
                  <li
                    className="rounded-lg border bg-muted/20 p-3"
                    key={example.expression}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <code className="text-xs">{example.expression}</code>
                      <Badge variant="secondary">{example.result}</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {example.explanation}
                    </p>
                  </li>
                ))}
              </ul>
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
        </aside>
      </div>

      <section className="grid gap-4 lg:grid-cols-3">
        <CodeBlock
          code={dependencyArrayCode}
          description="React compares serverUrl and roomId after each commit."
          title="Primitive dependencies"
        />
        <CodeBlock
          code={unnecessaryObjectCode}
          description="The object looks the same, but the reference changes every render."
          title="Unnecessary object dependency"
        />
        <CodeBlock
          code={objectInsideEffectCode}
          description="Moving the object inside the Effect leaves roomId as the reactive input."
          title="Object inside the Effect"
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <Card>
          <CardHeader>
            <CardTitle>Common Dependency Traps</CardTitle>
            <CardDescription>
              These are usually identity problems, not deep comparison problems.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {dependencyPitfalls.map((pitfall) => {
              const Icon = pitfall.icon

              return (
                <article
                  className="rounded-lg border bg-muted/20 p-3"
                  key={pitfall.title}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-primary" />
                    <h2 className="text-sm font-semibold">{pitfall.title}</h2>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    <strong className="font-medium text-foreground">
                      Problem:
                    </strong>{' '}
                    {pitfall.problem}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    <strong className="font-medium text-foreground">
                      Fix:
                    </strong>{' '}
                    {pitfall.fix}
                  </p>
                </article>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stabilizing Identity</CardTitle>
            <CardDescription>
              Reach for the smallest change that expresses the real dependency.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {stabilizationChoices.map((choice) => {
              const Icon = choice.icon

              return (
                <article className="flex gap-3" key={choice.title}>
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold">{choice.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {choice.description}
                    </p>
                  </div>
                </article>
              )
            })}

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm leading-6 text-muted-foreground">
              <strong className="font-semibold text-foreground">
                Rule of thumb:
              </strong>{' '}
              Do not fight the dependency list. Change the code so the list
              describes the values the Effect actually synchronizes with.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export { EffectDependenciesPage }
