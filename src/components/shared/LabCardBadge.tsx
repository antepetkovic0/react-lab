import type * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export type LabCardSectionValue =
  | 'fundamentals'
  | 'hooks-effects'
  | 'routing'
  | 'forms-validation'
  | 'state-management'
  | 'data-fetching'
  | 'ui-patterns'
  | 'performance'
  | 'security'
  | 'testing'
  | 'architecture'

type LabCardBadgeProps = Omit<
  React.ComponentProps<typeof Badge>,
  'children' | 'variant'
> & {
  section: LabCardSectionValue
}

const sectionMeta: Record<
  LabCardSectionValue,
  {
    label: string
    className: string
  }
> = {
  fundamentals: {
    label: 'Fundamentals',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  'hooks-effects': {
    label: 'Hooks & Effects',
    className: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  routing: {
    label: 'Routing',
    className: 'border-sky-200 bg-sky-50 text-sky-700',
  },
  'forms-validation': {
    label: 'Forms & Validation',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
  'state-management': {
    label: 'State Management',
    className: 'border-amber-200 bg-amber-50 text-amber-700',
  },
  'data-fetching': {
    label: 'Data Fetching',
    className: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  },
  'ui-patterns': {
    label: 'UI Patterns',
    className: 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700',
  },
  performance: {
    label: 'Performance',
    className: 'border-orange-200 bg-orange-50 text-orange-700',
  },
  security: {
    label: 'Security',
    className: 'border-red-200 bg-red-50 text-red-700',
  },
  testing: {
    label: 'Testing',
    className: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  },
  architecture: {
    label: 'Architecture',
    className: 'border-slate-200 bg-slate-50 text-slate-700',
  },
}

export function LabCardBadge({
  section,
  className,
  ...props
}: LabCardBadgeProps) {
  const meta = sectionMeta[section]

  return (
    <Badge
      className={cn('w-fit border', meta.className, className)}
      variant="outline"
      {...props}
    >
      {meta.label}
    </Badge>
  )
}
