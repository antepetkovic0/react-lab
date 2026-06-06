import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection } from '@/components/shared/lab-topics-section/LabTopicsSection'
import { getLabsBySection } from '@/content/labs'

export const Route = createFileRoute('/_dashboard/fundamentals')({
  component: FundamentalsPage,
})

const labCards = getLabsBySection('fundamentals')

function FundamentalsPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/fundamentals') {
    return <Outlet />
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabTopicsSection
        description="Cover the primitives every React developer needs before reaching for ecosystem libraries."
        eyebrow="Core React"
        title="Fundamentals"
        topics={[
          {
            title: 'JSX',
            description: 'Write markup-like JavaScript that returns UI.',
          },
          {
            title: 'Components',
            description: 'Split screens into named, reusable pieces.',
          },
          {
            title: 'Props',
            description: 'Pass read-only data from parent to child.',
          },
          {
            title: 'State',
            description: 'Track values a component owns over time.',
          },
          {
            title: 'Conditional rendering',
            description: 'Choose what appears from the current data.',
          },
          {
            title: 'Rendering lists',
            description: 'Map arrays into stable UI with keys.',
          },
        ]}
      />
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-wide text-primary uppercase">
              Lab Cards
            </p>
          </div>
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
