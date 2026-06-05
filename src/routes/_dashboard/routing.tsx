import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/routing')({
  component: RoutingPage,
})

function RoutingPage() {
  return (
    <LabSectionPage
      description="Build route trees, nested layouts, route params, search params, and data-aware navigation."
      eyebrow="Navigation"
      labs={[
        'Nested layout routes',
        'Search param filters',
        'Route params detail page',
        'Pending and error route states',
      ]}
      title="Routing"
      topics={[
        'TanStack Router',
        'File-based routes',
        'Nested layouts',
        'Route params',
        'Search params',
        'Route loading states',
      ]}
    />
  )
}
