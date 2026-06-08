import { createFileRoute } from '@tanstack/react-router'
import { FundamentalsPage } from '@/features/fundamentals/FundamentalsPage'

export const Route = createFileRoute('/_dashboard/fundamentals')({
  component: FundamentalsPage,
})
