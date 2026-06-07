import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'
import { getLabsBySection } from '@/content/labs'

export const Route = createFileRoute('/_dashboard/ui-patterns')({
  component: UiPatternsPage,
})

const labCards = getLabsBySection('ui-patterns')

function UiPatternsPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/ui-patterns') {
    return <Outlet />
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabSectionPage
        description="Collect reusable component patterns that make product interfaces easier to build and maintain."
        eyebrow="Interface Design"
        title="UI Patterns"
        topics={[
          {
            title: 'Composition patterns',
            description:
              'Shape components around reusable slots, children, and layout primitives.',
          },
          {
            title: 'Compound components',
            description:
              'Coordinate related child components through shared internal context.',
          },
          {
            title: 'Accessibility',
            description:
              'Use semantic structure, keyboard support, and ARIA only where it adds clarity.',
          },
          {
            title: 'Tables',
            description:
              'Design dense data views with sorting, selection, pagination, and responsive states.',
          },
          {
            title: 'Dialogs',
            description:
              'Manage focus, escape behavior, overlays, and confirmation flows safely.',
          },
          {
            title: 'Design system primitives',
            description:
              'Build small reusable foundations that keep product interfaces consistent.',
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
