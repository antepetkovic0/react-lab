import { createFileRoute } from '@tanstack/react-router'
import { DataFetchingPage } from '@/features/data-fetching/DataFetchingPage'

export const Route = createFileRoute('/_dashboard/data-fetching')({
  component: DataFetchingPage,
})
