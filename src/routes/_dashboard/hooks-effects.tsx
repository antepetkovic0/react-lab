import { createFileRoute } from '@tanstack/react-router'
import { HooksEffectsPage } from '@/features/hooks-effects/HooksEffectsPage'

export const Route = createFileRoute('/_dashboard/hooks-effects')({
  component: HooksEffectsPage,
})
