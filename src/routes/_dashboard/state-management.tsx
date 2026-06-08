import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/state-management')({
  component: StateManagementPage,
})

function StateManagementPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/state-management') {
    return <Outlet />
  }

  return (
    <LabSectionPage
      description="Compare local, shared, and global state patterns so each problem gets the smallest useful tool."
      eyebrow="Client State"
      labs={[
        'Reducer state machine',
        'Local state refactor',
        'Context provider lab',
        'Zustand store',
        'Redux Toolkit slice',
      ]}
      title="State Management"
      topics={[
        {
          title: 'Local state',
          description:
            'Keep state near the component that owns the interaction whenever possible.',
        },
        {
          title: 'Derived state',
          description:
            'Calculate values from existing data instead of duplicating state unnecessarily.',
        },
        {
          title: 'Reducer state machines',
          description:
            'Represent complex flows as explicit states, events, and valid transitions.',
        },
        {
          title: 'Context',
          description:
            'Share values across a subtree without passing props through every layer.',
        },
        {
          title: 'Zustand',
          description:
            'Use a small external store for shared client state with minimal setup.',
        },
        {
          title: 'Redux Toolkit',
          description:
            'Model larger state transitions with slices, actions, and predictable updates.',
        },
        {
          title: 'URL state',
          description:
            'Put shareable filters, tabs, and view options into search params.',
        },
      ]}
    />
  )
}
