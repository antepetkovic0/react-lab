import { createFileRoute } from '@tanstack/react-router'
import { StateManagementPage } from '@/features/state-management/StateManagementPage'

export const Route = createFileRoute('/_dashboard/state-management')({
  component: StateManagementPage,
})
