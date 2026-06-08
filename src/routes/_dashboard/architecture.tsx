import { createFileRoute } from '@tanstack/react-router'
import { ArchitecturePage } from '@/features/architecture/ArchitecturePage'

export const Route = createFileRoute('/_dashboard/architecture')({
  component: ArchitecturePage,
})
