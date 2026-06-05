import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/state-management')({
  component: StateManagementPage,
})

function StateManagementPage() {
  return (
    <LabSectionPage
      description="Compare local, shared, and global state patterns so each problem gets the smallest useful tool."
      eyebrow="Client State"
      labs={[
        'Local state refactor',
        'Context provider lab',
        'Zustand store',
        'Redux Toolkit slice',
      ]}
      title="State Management"
      topics={[
        'Local state',
        'Derived state',
        'Context',
        'Zustand',
        'Redux Toolkit',
        'URL state',
      ]}
    />
  )
}
