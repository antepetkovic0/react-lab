import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/data-fetching')({
  component: DataFetchingPage,
})

function DataFetchingPage() {
  return (
    <LabSectionPage
      description="Model remote data as cacheable, invalidatable server state instead of manual loading flags everywhere."
      eyebrow="Remote Data"
      labs={[
        'TanStack Query todo list',
        'Optimistic mutation',
        'Pagination and prefetching',
        'Offline and retry states',
      ]}
      title="Data Fetching"
      topics={[
        {
          title: 'TanStack Query',
          description:
            'Use query keys, caching, retries, and background refresh for server state.',
        },
        {
          title: 'Queries',
          description:
            'Load remote data with explicit keys, fetch functions, and lifecycle states.',
        },
        {
          title: 'Mutations',
          description:
            'Send writes to the server and coordinate their effects on cached data.',
        },
        {
          title: 'Cache invalidation',
          description:
            'Refresh stale resources intentionally after related data changes.',
        },
        {
          title: 'Optimistic updates',
          description:
            'Update the UI before the server responds, then reconcile success or failure.',
        },
        {
          title: 'Loading and error states',
          description:
            'Design empty, pending, failed, and retry states around the user task.',
        },
      ]}
    />
  )
}
