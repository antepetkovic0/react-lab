import { createFileRoute } from '@tanstack/react-router'
import { RoutingPage } from '@/features/routing/RoutingPage'

export const Route = createFileRoute('/_dashboard/routing')({
  component: RoutingPage,
})
