import { createFileRoute } from '@tanstack/react-router'
import { CompoundComponentsPage } from '@/features/ui-patterns/compound-components/CompoundComponentsPage'

export const Route = createFileRoute(
  '/_dashboard/ui-patterns/compound-components',
)({
  component: CompoundComponentsPage,
})
