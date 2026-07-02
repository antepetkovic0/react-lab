import { createFileRoute } from '@tanstack/react-router'
import { ReactHookFormZodPage } from '@/features/forms-validation/react-hook-form-zod/ReactHookFormZodPage'

export const Route = createFileRoute(
  '/_dashboard/forms-validation/react-hook-form-zod',
)({
  component: ReactHookFormZodPage,
})
