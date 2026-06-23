import {
  ArrowRightIcon,
  CheckCircle2Icon,
  ExternalLinkIcon,
  InfoIcon,
} from 'lucide-react'
import { useState } from 'react'
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
  concepts,
  decisionSteps,
  liftedStateCode,
  localStateCode,
  palettes,
  rules,
  valueHandlerCode,
} from './lifting-state-up.data'

type PaletteId = (typeof palettes)[number]['id']
type OwnershipMode = 'colocated' | 'lifted'

type PaletteStyle = {
  surface: string
  accent: string
  text: string
  meter: string
}

const paletteStyles: Record<PaletteId, PaletteStyle> = {
  calm: {
    surface: 'border-emerald-200 bg-emerald-50/70',
    accent: 'bg-emerald-600',
    text: 'text-emerald-950',
    meter: 'bg-emerald-500',
  },
  focus: {
    surface: 'border-sky-200 bg-sky-50/70',
    accent: 'bg-sky-600',
    text: 'text-sky-950',
    meter: 'bg-sky-500',
  },
  warm: {
    surface: 'border-rose-200 bg-rose-50/70',
    accent: 'bg-rose-600',
    text: 'text-rose-950',
    meter: 'bg-rose-500',
  },
}

function getPalette(id: PaletteId) {
  return palettes.find((palette) => palette.id === id) ?? palettes[0]
}

type PaletteButtonsProps = {
  label: string
  selectedId: PaletteId
  onSelect: (id: PaletteId) => void
}

function PaletteButtons({ label, onSelect, selectedId }: PaletteButtonsProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-xs font-medium text-muted-foreground">
        {label}
      </legend>
      <div className="grid gap-2 sm:grid-cols-3">
        {palettes.map((palette) => {
          const isSelected = palette.id === selectedId
          const styles = paletteStyles[palette.id]

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                'rounded-lg border bg-background p-3 text-left text-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
                isSelected && 'border-primary bg-primary/10 text-primary',
              )}
              key={palette.id}
              onClick={() => onSelect(palette.id)}
              type="button"
            >
              <span className="flex items-center gap-2 font-medium">
                <span
                  className={cn('size-3 rounded-full', styles.accent)}
                  aria-hidden="true"
                />
                {palette.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                {palette.description}
              </span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

type ThemePreviewProps = {
  selectedId: PaletteId
  title: string
  description: string
}

function ThemePreview({ description, selectedId, title }: ThemePreviewProps) {
  const palette = getPalette(selectedId)
  const styles = paletteStyles[selectedId]

  return (
    <div className={cn('rounded-lg border p-4', styles.surface)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <h3 className={cn('mt-1 text-lg font-semibold', styles.text)}>
            {palette.label} workspace
          </h3>
        </div>
        <Badge variant="outline">{palette.id}</Badge>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
      <div className="mt-4 grid gap-2">
        <div className="h-2 overflow-hidden rounded-full bg-background/80">
          <div className={cn('h-full w-2/3 rounded-full', styles.meter)} />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className={cn('h-10 rounded-md', styles.accent)} />
          <span className="h-10 rounded-md border bg-background/80" />
          <span className="h-10 rounded-md border bg-background/80" />
        </div>
      </div>
    </div>
  )
}

function LocalThemePicker() {
  const [selectedId, setSelectedId] = useState<PaletteId>('calm')

  return (
    <section className="space-y-4 rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Theme picker</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            This child owns its selected theme locally.
          </p>
        </div>
        <Badge variant="secondary">useState here</Badge>
      </div>
      <PaletteButtons
        label="Picker state"
        onSelect={setSelectedId}
        selectedId={selectedId}
      />
      <ThemePreview
        description="The picker can preview itself, but no sibling can read this state unless it is passed up."
        selectedId={selectedId}
        title="Local preview"
      />
    </section>
  )
}

function LocalPreviewPanel() {
  const [selectedId, setSelectedId] = useState<PaletteId>('focus')

  return (
    <section className="space-y-4 rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Sidebar preview</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            This sibling has a separate copy, so it can drift.
          </p>
        </div>
        <Badge variant="outline">independent</Badge>
      </div>
      <PaletteButtons
        label="Preview state"
        onSelect={setSelectedId}
        selectedId={selectedId}
      />
      <ThemePreview
        description="Changing the picker does not update this sibling because they do not share one source of truth."
        selectedId={selectedId}
        title="Sibling preview"
      />
    </section>
  )
}

type LiftedThemePickerProps = {
  selectedId: PaletteId
  onSelect: (id: PaletteId) => void
}

function LiftedThemePicker({ onSelect, selectedId }: LiftedThemePickerProps) {
  return (
    <section className="space-y-4 rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Theme picker</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            The value and setter are passed down from the parent.
          </p>
        </div>
        <Badge variant="secondary">controlled</Badge>
      </div>
      <PaletteButtons
        label="Shared parent state"
        onSelect={onSelect}
        selectedId={selectedId}
      />
    </section>
  )
}

type LiftedPreviewPanelProps = {
  selectedId: PaletteId
  onSelect: (id: PaletteId) => void
}

function LiftedPreviewPanel({ onSelect, selectedId }: LiftedPreviewPanelProps) {
  return (
    <section className="space-y-4 rounded-lg border bg-background p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Sidebar preview</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            This sibling reads the same parent-owned value.
          </p>
        </div>
        <Badge variant="outline">same source</Badge>
      </div>
      <ThemePreview
        description="The preview updates immediately because it receives the same selected theme as the picker."
        selectedId={selectedId}
        title="Shared preview"
      />
      <PaletteButtons
        label="Preview can update the parent too"
        onSelect={onSelect}
        selectedId={selectedId}
      />
    </section>
  )
}

function OwnershipPlayground() {
  const [mode, setMode] = useState<OwnershipMode>('colocated')
  const [liftedTheme, setLiftedTheme] = useState<PaletteId>('calm')
  const isLifted = mode === 'lifted'

  return (
    <Card className="gap-0 py-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold">State Ownership Lab</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Toggle between isolated child state and one parent-owned source of
            truth.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            aria-pressed={!isLifted}
            onClick={() => setMode('colocated')}
            size="sm"
            type="button"
            variant={!isLifted ? 'default' : 'outline'}
          >
            Co-located
          </Button>
          <Button
            aria-pressed={isLifted}
            onClick={() => setMode('lifted')}
            size="sm"
            type="button"
            variant={isLifted ? 'default' : 'outline'}
          >
            Lifted
          </Button>
        </div>
      </div>
      <CardContent className="space-y-4 p-4">
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3 text-sm leading-6 text-muted-foreground">
          {isLifted
            ? 'The parent owns selectedTheme once, then passes the value and update handler to both children.'
            : 'Each child has useful local state, but the two selections can drift because no common parent owns the shared value.'}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {isLifted ? (
            <>
              <LiftedThemePicker
                onSelect={setLiftedTheme}
                selectedId={liftedTheme}
              />
              <LiftedPreviewPanel
                onSelect={setLiftedTheme}
                selectedId={liftedTheme}
              />
            </>
          ) : (
            <>
              <LocalThemePicker />
              <LocalPreviewPanel />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function DecisionDiagram() {
  return (
    <Card className="gap-0 py-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold" id="state-decision-title">
            Where should state live?
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            A compact decision flow for moving state down, up, or into a nearby
            provider.
          </p>
        </div>
        <Badge className="bg-primary/10 text-primary" variant="outline">
          Refactor loop
        </Badge>
      </div>
      <CardContent className="space-y-5 p-4">
        <div
          aria-labelledby="state-decision-title"
          className="grid gap-3 lg:grid-cols-[repeat(3,minmax(0,1fr))]"
          role="img"
        >
          {decisionSteps.map((step, index) => {
            const isLast = index === decisionSteps.length - 1

            return (
              <div className="grid gap-3" key={step.id}>
                <div className="rounded-lg border bg-background p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Badge variant="secondary">Step {index + 1}</Badge>
                    {isLast ? (
                      <CheckCircle2Icon className="size-4 text-primary" />
                    ) : null}
                  </div>
                  <h3 className="mt-3 text-sm font-semibold">{step.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
                {!isLast ? (
                  <div
                    aria-hidden="true"
                    className="flex justify-center text-muted-foreground lg:hidden"
                  >
                    <ArrowRightIcon className="size-4 rotate-90" />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="rounded-lg border bg-muted/20 p-4">
          <h3 className="text-sm font-semibold">Accessible flow</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-muted-foreground">
            {decisionSteps.map((step) => (
              <li key={step.id}>
                <span className="font-medium text-foreground">
                  {step.label}:
                </span>{' '}
                {step.detail}
              </li>
            ))}
          </ol>
        </div>

        <p className="text-sm leading-6 text-muted-foreground">
          Inspired by{' '}
          <a
            className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
            href="https://kentcdodds.com/blog/state-colocation-will-make-your-react-app-faster"
            rel="noreferrer"
            target="_blank"
          >
            Kent C. Dodds&apos; state colocation decision tree
            <ExternalLinkIcon className="size-3.5" />
          </a>
          .
        </p>
      </CardContent>
    </Card>
  )
}

type CodeBlockProps = {
  code: string
  title: string
  description: string
}

function CodeBlock({ code, description, title }: CodeBlockProps) {
  return (
    <div className="overflow-hidden rounded-lg border bg-background">
      <div className="border-b bg-muted/30 px-4 py-3">
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{description}</p>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function LiftingStateUpPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <RouteBreadcrumbs />

      <section className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-3xl font-semibold tracking-tight">
              Lifting State Up
            </h1>
            <Badge className="bg-primary/10 text-primary" variant="outline">
              Fundamentals
            </Badge>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            Practice the state ownership loop: keep state close while one
            component owns the interaction, then lift it to the nearest common
            parent when siblings need to stay in sync.
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

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <OwnershipPlayground />

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <InfoIcon className="size-4 text-primary" />
                The Decision
              </CardTitle>
              <CardDescription>
                Local state and lifted state are both useful. The owner changes
                when the requirements change.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm leading-6 text-muted-foreground">
                {rules.map((rule) => (
                  <li className="rounded-md bg-muted/30 p-3" key={rule}>
                    {rule}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Closest Common Parent</CardTitle>
              <CardDescription>
                Lift only as far as needed for every reader and writer to
                coordinate.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm leading-6 text-muted-foreground">
              <p>
                The lifted mode stores <code>selectedTheme</code> in the parent.
                The picker can change it, and the preview can read it because
                both children receive props from the same owner.
              </p>
              <p>
                If the preview were removed, the state could move back down into
                the picker.
              </p>
            </CardContent>
          </Card>
        </aside>
      </div>

      <DecisionDiagram />

      <section className="grid gap-4 lg:grid-cols-3">
        <CodeBlock
          code={localStateCode}
          description="Best when one component owns the interaction."
          title="Co-located state"
        />
        <CodeBlock
          code={liftedStateCode}
          description="Best when siblings need one shared value."
          title="Lifted state"
        />
        <CodeBlock
          code={valueHandlerCode}
          description="Children receive data and report intent through callbacks."
          title="Value plus handler"
        />
      </section>
    </div>
  )
}

export { LiftingStateUpPage }
