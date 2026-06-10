import {
  Code2Icon,
  FileCode2Icon,
  InfoIcon,
  SlidersHorizontalIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
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
import { cn } from '@/lib/utils'
import {
  cnCode,
  concepts,
  controlGroups,
  references,
  usageNotes,
  withoutVariantsCode,
  withVariantsCode,
} from './class-variance-authority.data'
import {
  SignalCard,
  type SignalDensity,
  type SignalEmphasis,
  type SignalIntent,
} from './SignalCard'

function ClassVarianceAuthorityPage() {
  const [intent, setIntent] = useState<SignalIntent>('success')
  const [density, setDensity] = useState<SignalDensity>('comfortable')
  const [emphasis, setEmphasis] = useState<SignalEmphasis>('soft')
  const [interactive, setInteractive] = useState(true)
  const [consumerOverride, setConsumerOverride] = useState(false)

  const generatedClassName = useMemo(
    () =>
      [
        `intent: ${intent}`,
        `density: ${density}`,
        `emphasis: ${emphasis}`,
        `interactive: ${interactive}`,
        consumerOverride ? 'className: p-6 ring-4' : 'className: none',
      ].join(' | '),
    [consumerOverride, density, emphasis, intent, interactive],
  )

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Class Variance Authority
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              UI Patterns
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Model component styles as typed variant recipes. Compare manual
            class branching with CVA, then use <code>compoundVariants</code>,{' '}
            <code>clsx</code>, and <code>tailwind-merge</code> to keep a custom
            component flexible without turning its className into a knot.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {concepts.map((concept) => {
          const Icon = concept.icon

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
            </article>
          )
        })}
      </section>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
        <Card className="min-h-[620px] gap-0 py-0">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <SlidersHorizontalIcon className="size-4 text-primary" />
              <span className="text-sm font-medium">
                Example: Release Signal Card
              </span>
            </div>
            <Badge variant="outline">CVA recipe</Badge>
          </div>
          <CardContent className="space-y-5 p-4">
            <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_250px]">
              <div className="rounded-lg border bg-muted/20 p-4">
                <SignalCard
                  className={
                    consumerOverride ? 'p-6 ring-4 ring-primary/20' : ''
                  }
                  density={density}
                  emphasis={emphasis}
                  intent={intent}
                  interactive={interactive}
                />

                <div className="mt-4 rounded-lg border bg-background p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    Current variant props
                  </p>
                  <p className="mt-2 break-words text-xs leading-6">
                    {generatedClassName}
                  </p>
                </div>
              </div>

              <div className="space-y-4 rounded-lg border bg-background p-4">
                <ControlGroup
                  label="Intent"
                  onChange={(value) => setIntent(value as SignalIntent)}
                  options={controlGroups.intent}
                  value={intent}
                />
                <ControlGroup
                  label="Density"
                  onChange={(value) => setDensity(value as SignalDensity)}
                  options={controlGroups.density}
                  value={density}
                />
                <ControlGroup
                  label="Emphasis"
                  onChange={(value) => setEmphasis(value as SignalEmphasis)}
                  options={controlGroups.emphasis}
                  value={emphasis}
                />

                <label className="flex items-start gap-2 rounded-md border bg-muted/20 p-3 text-sm">
                  <input
                    checked={interactive}
                    className="mt-1 accent-primary"
                    onChange={(event) => setInteractive(event.target.checked)}
                    type="checkbox"
                  />
                  <span>
                    <span className="font-medium">Interactive</span>
                    <span className="block text-xs leading-5 text-muted-foreground">
                      Adds hover movement and the solid hover compound rule.
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-2 rounded-md border bg-muted/20 p-3 text-sm">
                  <input
                    checked={consumerOverride}
                    className="mt-1 accent-primary"
                    onChange={(event) =>
                      setConsumerOverride(event.target.checked)
                    }
                    type="checkbox"
                  />
                  <span>
                    <span className="font-medium">Consumer className</span>
                    <span className="block text-xs leading-5 text-muted-foreground">
                      Adds <code>p-6 ring-4</code>. The local <code>cn()</code>{' '}
                      helper lets later padding override the recipe padding.
                    </span>
                  </span>
                </label>
              </div>
            </section>

            <section className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex gap-2">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center text-primary">
                  <InfoIcon className="size-4" />
                </span>
                <p className="text-sm leading-6 text-muted-foreground">
                  The card has three independent variants and a few special
                  combinations. That is exactly where manual branching starts to
                  hide design rules, while CVA keeps those rules in one table.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode2Icon className="size-4 text-primary" />
                When to Use It
              </CardTitle>
              <CardDescription>
                CVA is most useful at component boundaries.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {usageNotes.map((note) => (
                  <li
                    className="rounded-md border bg-muted/20 p-3"
                    key={note.title}
                  >
                    <span className="font-medium text-foreground">
                      {note.title}
                    </span>
                    <span className="mt-1 block">{note.description}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2Icon className="size-4 text-primary" />
                Mental Model
              </CardTitle>
              <CardDescription>
                The pieces readers should remember.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm leading-6 text-muted-foreground">
                {references.map((reference) => (
                  <li className="flex gap-2" key={reference}>
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    <span>{reference}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>

      <section className="grid gap-4 xl:grid-cols-2">
        <CodePanel
          code={withoutVariantsCode}
          eyebrow="Before"
          title="Manual class branching"
        />
        <CodePanel
          code={withVariantsCode}
          eyebrow="After"
          title="CVA with compoundVariants"
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>clsx, cn, and tailwind-merge</CardTitle>
          <CardDescription>
            CVA owns the variant recipe. This app uses <code>cn()</code>, which
            combines <code>clsx</code> with <code>tailwind-merge</code>,
            whenever conditional classes and external className overrides should
            win safely.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="overflow-x-auto rounded-lg bg-muted p-3 text-xs leading-6">
            <code>{cnCode}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}

type ControlGroupProps = {
  label: string
  options: readonly string[]
  value: string
  onChange: (value: string) => void
}

function ControlGroup({ label, onChange, options, value }: ControlGroupProps) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Button
            aria-pressed={value === option}
            className={cn(value !== option && 'bg-background')}
            key={option}
            onClick={() => onChange(option)}
            size="sm"
            type="button"
            variant={value === option ? 'default' : 'outline'}
          >
            {option}
          </Button>
        ))}
      </div>
    </fieldset>
  )
}

type CodePanelProps = {
  code: string
  eyebrow: string
  title: string
}

function CodePanel({ code, eyebrow, title }: CodePanelProps) {
  return (
    <Card className="gap-0 py-0">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="text-sm font-semibold">{title}</h2>
        </div>
        <Badge variant="secondary">{eyebrow}</Badge>
      </div>
      <CardContent className="p-4">
        <pre className="max-h-[620px] overflow-auto rounded-lg bg-muted p-3 text-xs leading-6">
          <code>{code}</code>
        </pre>
      </CardContent>
    </Card>
  )
}

export { ClassVarianceAuthorityPage }
