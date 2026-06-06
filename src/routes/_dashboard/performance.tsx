import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection } from '@/components/shared/lab-topics-section/LabTopicsSection'
import { getLabsBySection } from '@/content/labs'

export const Route = createFileRoute('/_dashboard/performance')({
  component: PerformancePage,
})

const labCards = getLabsBySection('performance')

function PerformancePage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/performance') {
    return <Outlet />
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabTopicsSection
        description="Measure before optimizing, then apply the right React and browser performance patterns."
        eyebrow="Speed"
        title="Performance"
        topics={[
          {
            title: 'Profiling',
            description: 'Find slow renders before guessing at fixes.',
          },
          {
            title: 'Memoization',
            description: 'Cache work only when it removes real cost.',
          },
          {
            title: 'Code splitting',
            description: 'Ship less JavaScript on the first route.',
          },
          {
            title: 'Virtualization',
            description: 'Render only the visible rows in large lists.',
          },
          {
            title: 'Render waterfalls',
            description: 'Avoid chains of work that delay interactivity.',
          },
          {
            title: 'Bundle size',
            description: 'Watch dependency cost and route-level payloads.',
          },
        ]}
      />

      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Lab Cards
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labCards.map((card) => (
            <LabCard
              className="w-full"
              description={card.description}
              href={card.href}
              imageAlt={card.imageAlt}
              imageSrc={card.imageSrc}
              key={card.title}
              level={card.level}
              section={card.section}
              title={card.title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
