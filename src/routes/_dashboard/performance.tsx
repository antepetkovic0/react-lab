import { createFileRoute } from '@tanstack/react-router'
import { PerformancePage } from '@/features/performance/PerformancePage'

export const Route = createFileRoute('/_dashboard/performance')({
  component: PerformancePage,
})
