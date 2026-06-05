import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/forms-validation')({
  component: FormsValidationPage,
})

function FormsValidationPage() {
  return (
    <LabSectionPage
      description="Practice reliable form UX, validation, submission states, and type-safe schemas."
      eyebrow="Input Workflows"
      labs={[
        'Controlled vs uncontrolled inputs',
        'React Hook Form checkout',
        'Zod schema validation',
        'Async submit and error states',
      ]}
      title="Forms & Validation"
      topics={[
        'Controlled inputs',
        'Uncontrolled inputs',
        'React Hook Form',
        'Zod schemas',
        'Field errors',
        'Submission states',
      ]}
    />
  )
}
