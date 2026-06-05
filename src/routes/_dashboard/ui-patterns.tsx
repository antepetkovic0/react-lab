import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/ui-patterns')({
  component: UiPatternsPage,
})

function UiPatternsPage() {
  return (
    <LabSectionPage
      description="Collect reusable component patterns that make product interfaces easier to build and maintain."
      eyebrow="Interface Design"
      labs={[
        'Accessible modal',
        'Compound tabs component',
        'Reusable data table',
        'Empty, loading, and error states',
      ]}
      title="UI Patterns"
      topics={[
        'Composition patterns',
        'Compound components',
        'Accessibility',
        'Tables',
        'Dialogs',
        'Design system primitives',
      ]}
    />
  )
}
