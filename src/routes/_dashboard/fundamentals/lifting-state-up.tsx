import { createFileRoute } from '@tanstack/react-router'
import { LiftingStateUpPage } from '@/features/fundamentals/lifting-state-up/LiftingStateUpPage'

export const Route = createFileRoute(
  '/_dashboard/fundamentals/lifting-state-up',
)({
  component: LiftingStateUpPage,
})
