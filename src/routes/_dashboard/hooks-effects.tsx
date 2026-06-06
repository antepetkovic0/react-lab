import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'
import { getLabsBySection } from '@/content/labs'

export const Route = createFileRoute('/_dashboard/hooks-effects')({
  component: HooksEffectsPage,
})

const labCards = getLabsBySection('hooks-effects')

function HooksEffectsPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/hooks-effects') {
    return <Outlet />
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabSectionPage
        description="Learn how hooks model state, refs, memoized values, subscriptions, and external synchronization."
        eyebrow="React Runtime"
        title="Hooks & Effects"
        topics={[
          {
            title: 'useState',
            description: 'Store values that should trigger a render.',
          },
          {
            title: 'useEffect',
            description: 'Synchronize with timers, browser APIs, and servers.',
          },
          {
            title: 'useRef',
            description: 'Keep mutable values without causing renders.',
          },
          {
            title: 'useReducer',
            description: 'Move complex state transitions into one function.',
          },
          {
            title: 'Memo hooks',
            description: 'Reuse derived values and stable callbacks carefully.',
          },
          {
            title: 'Custom hooks',
            description: 'Extract reusable behavior behind a clear API.',
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
