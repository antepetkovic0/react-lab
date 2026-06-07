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
        {
          title: 'Controlled inputs',
          description:
            'Keep form values in React state when the UI needs immediate coordination.',
        },
        {
          title: 'Uncontrolled inputs',
          description:
            'Let the DOM own field values when refs and submit-time reads are enough.',
        },
        {
          title: 'React Hook Form',
          description:
            'Build performant forms with field registration, validation, and submission helpers.',
        },
        {
          title: 'Zod schemas',
          description:
            'Validate input with reusable schemas that can also infer TypeScript types.',
        },
        {
          title: 'Field errors',
          description:
            'Show clear validation feedback without hiding context or breaking focus flow.',
        },
        {
          title: 'Submission states',
          description:
            'Represent pending, success, failure, and retry behavior during form submits.',
        },
      ]}
    />
  )
}
