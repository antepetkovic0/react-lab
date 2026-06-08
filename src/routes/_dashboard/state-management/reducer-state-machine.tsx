import { createFileRoute } from '@tanstack/react-router'
import { ReducerStateMachinePage } from '@/features/state-management/reducer-state-machine/ReducerStateMachinePage'

export const Route = createFileRoute(
  '/_dashboard/state-management/reducer-state-machine',
)({
  component: ReducerStateMachinePage,
})
