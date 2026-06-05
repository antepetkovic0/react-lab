import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/security')({
  component: SecurityPage,
})

function SecurityPage() {
  return (
    <LabSectionPage
      description="Practice the client-side security habits that matter in real React apps."
      eyebrow="Trust Boundaries"
      labs={[
        'Safe rich text rendering',
        'Auth route guard',
        'Token storage comparison',
        'Dependency risk checklist',
      ]}
      title="Security"
      topics={[
        'XSS prevention',
        'Auth flows',
        'Token handling',
        'Protected routes',
        'Dependency risk',
        'Safe rendering',
      ]}
    />
  )
}
