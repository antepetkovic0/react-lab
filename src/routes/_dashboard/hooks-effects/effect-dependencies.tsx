import { createFileRoute } from '@tanstack/react-router'
import { EffectDependenciesPage } from '@/features/hooks-effects/effect-dependencies/EffectDependenciesPage'

export const Route = createFileRoute(
  '/_dashboard/hooks-effects/effect-dependencies',
)({
  component: EffectDependenciesPage,
})
