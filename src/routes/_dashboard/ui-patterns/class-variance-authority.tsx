import { createFileRoute } from '@tanstack/react-router'
import { ClassVarianceAuthorityPage } from '@/features/ui-patterns/class-variance-authority/ClassVarianceAuthorityPage'

export const Route = createFileRoute(
  '/_dashboard/ui-patterns/class-variance-authority',
)({
  component: ClassVarianceAuthorityPage,
})
