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
        {
          title: 'TanStack Router',
          description:
            'Use typed route definitions to connect navigation, params, loaders, and layouts.',
        },
        {
          title: 'File-based routes',
          description:
            'Map route files to URL structure so the app tree stays discoverable.',
        },
        {
          title: 'Nested layouts',
          description:
            'Share shells, sidebars, and parent UI while child routes swap content.',
        },
        {
          title: 'Route params',
          description:
            'Read dynamic URL segments for detail pages and resource-specific screens.',
        },
        {
          title: 'Search params',
          description:
            'Store filters, sorting, and view state in the URL when users should share it.',
        },
        {
          title: 'Route loading states',
          description:
            'Handle pending, error, and not-found states close to the route that owns them.',
        },
      ]}
    />
  )
}
