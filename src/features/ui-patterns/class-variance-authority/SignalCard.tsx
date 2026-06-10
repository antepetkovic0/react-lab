import { cva, type VariantProps } from 'class-variance-authority'
import { ActivityIcon } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

const signalCardVariants = cva(
  'relative overflow-hidden rounded-lg border transition-all',
  {
    variants: {
      intent: {
        success:
          'border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-100',
        warning:
          'border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100',
        danger:
          'border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-100',
      },
      density: {
        compact: 'p-3',
        comfortable: 'p-4',
      },
      emphasis: {
        soft: 'shadow-none',
        solid: 'text-white shadow-sm',
      },
      interactive: {
        true: 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md',
        false: null,
      },
    },
    compoundVariants: [
      {
        intent: 'success',
        emphasis: 'solid',
        class: 'border-emerald-600 bg-emerald-600',
      },
      {
        intent: 'warning',
        emphasis: 'solid',
        class: 'border-amber-500 bg-amber-500 text-amber-950',
      },
      {
        intent: 'danger',
        emphasis: 'solid',
        class: 'border-rose-600 bg-rose-600',
      },
      {
        intent: ['warning', 'danger'],
        density: 'comfortable',
        class: 'ring-2 ring-current/10',
      },
      {
        emphasis: 'solid',
        interactive: true,
        class: 'hover:brightness-105',
      },
    ],
    defaultVariants: {
      density: 'comfortable',
      emphasis: 'soft',
      intent: 'success',
      interactive: true,
    },
  },
)

const signalCopy = {
  success: {
    title: 'Release is healthy',
    description:
      'All checks passed and the deployment can continue without extra review.',
    meta: '12 checks passed',
  },
  warning: {
    title: 'Needs a second look',
    description:
      'Performance budgets are close to the limit, so ship with a quick review.',
    meta: '2 checks near limit',
  },
  danger: {
    title: 'Release is blocked',
    description:
      'A required accessibility check failed and should be fixed before deploy.',
    meta: '1 required check failed',
  },
}

const dotTone = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
}

type SignalCardProps = React.ComponentProps<'article'> &
  VariantProps<typeof signalCardVariants> & {
    pulse?: boolean
  }

type SignalIntent = NonNullable<SignalCardProps['intent']>
type SignalDensity = NonNullable<SignalCardProps['density']>
type SignalEmphasis = NonNullable<SignalCardProps['emphasis']>

function SignalCard({
  className,
  density,
  emphasis,
  intent = 'success',
  interactive,
  pulse = true,
  ...props
}: SignalCardProps) {
  const activeIntent = intent ?? 'success'
  const copy = signalCopy[activeIntent]
  const isSolid = emphasis === 'solid'

  return (
    <article
      aria-label={`${copy.title}: ${copy.description}`}
      className={cn(
        signalCardVariants({ density, emphasis, intent, interactive }),
        className,
      )}
      {...props}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            'mt-1 flex size-9 shrink-0 items-center justify-center rounded-md bg-background/80 text-current',
            isSolid && 'bg-white/15',
          )}
        >
          <ActivityIcon className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-semibold">{copy.title}</h2>
            <span
              className={cn(
                'size-2.5 rounded-full',
                pulse && 'animate-pulse',
                dotTone[activeIntent],
                isSolid && 'bg-white',
              )}
            />
          </div>
          <p
            className={cn(
              'mt-2 text-sm leading-6 text-muted-foreground',
              isSolid && 'text-current/80',
            )}
          >
            {copy.description}
          </p>
          <p
            className={cn(
              'mt-3 text-xs font-medium',
              isSolid && 'text-current',
            )}
          >
            {copy.meta}
          </p>
        </div>
      </div>
    </article>
  )
}

export {
  SignalCard,
  type SignalDensity,
  type SignalEmphasis,
  type SignalIntent,
}
