import { createFileRoute } from '@tanstack/react-router'
import { UiPatternsPage } from '@/features/ui-patterns/UiPatternsPage'

export const Route = createFileRoute('/_dashboard/ui-patterns')({
  component: UiPatternsPage,
})
