import { createFileRoute } from '@tanstack/react-router'
import { FormsValidationPage } from '@/features/forms-validation/FormsValidationPage'

export const Route = createFileRoute('/_dashboard/forms-validation')({
  component: FormsValidationPage,
})
