import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/performance')({
  component: PerformancePage,
})

const labCards = [
  {
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M28 86h104" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M40 76V45M80 76V32M120 76V56" stroke="%23059669" stroke-width="8" stroke-linecap="round"/%3E%3Cpath d="M33 46h34M73 33h34M113 56h20" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-dasharray="3 6"/%3E%3Ccircle cx="40" cy="44" r="8" fill="%23059669"/%3E%3Ccircle cx="80" cy="32" r="8" fill="%23059669"/%3E%3Ccircle cx="120" cy="56" r="8" fill="%23059669"/%3E%3Cpath d="M36 101h8M76 101h8M116 101h8" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M38 20h84" stroke="%230f172a" stroke-width="3" stroke-linecap="round"/%3E%3C/svg%3E',
    imageAlt: 'Core Web Vitals metric bars',
    title: 'Core Web Vitals',
    description:
      'Measure LCP, INP, and CLS, then connect each score to the React and browser work behind it.',
    level: 'intermediate' as const,
    href: '/performance/core-web-vitals',
  },
]

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
              section="performance"
              title={card.title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
