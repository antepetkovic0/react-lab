import { createFileRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/fundamentals')({
  component: FundamentalsPage,
})

const labCards = [
  {
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M49 35 26 60l23 25M111 35l23 25-23 25" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Crect x="61" y="30" width="38" height="60" rx="9" fill="none" stroke="%230f172a" stroke-width="3"/%3E%3Cpath d="M72 47h16M72 60h16M72 73h10" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M57 24h46M57 96h46" stroke="%230891b2" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 7"/%3E%3Ccircle cx="80" cy="24" r="4" fill="%23059669"/%3E%3Ccircle cx="80" cy="96" r="4" fill="%23059669"/%3E%3C/svg%3E',
    imageAlt: 'JSX brackets around a component',
    title: 'Components & JSX',
    description:
      'Create small components, write JSX, and compose UI from simple reusable pieces.',
    level: 'beginner' as const,
    href: '/fundamentals/components-jsx',
  },
  {
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M48 36h29l15 24-15 24H48L33 60z" fill="none" stroke="%230f172a" stroke-width="3" stroke-linejoin="round"/%3E%3Cpath d="M92 36h20l15 24-15 24H92L77 60z" fill="none" stroke="%23059669" stroke-width="3" stroke-linejoin="round"/%3E%3Cpath d="M64 60h31" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="m91 52 8 8-8 8" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="55" cy="60" r="7" fill="%23059669"/%3E%3Cpath d="M103 52h13M103 68h9" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M38 29h18M104 91h18" stroke="%230891b2" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3C/svg%3E',
    imageAlt: 'Props flowing into stateful UI',
    title: 'State & Props',
    description:
      'Compare parent-owned inputs with component-owned values that change over time.',
    level: 'beginner' as const,
    href: '/fundamentals/state-props',
  },
  {
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M50 64a31 31 0 0 1 57-20" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M110 56a31 31 0 0 1-57 20" fill="none" stroke="%23059669" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="m103 39 8 1 1-8M57 81l-8-1-1 8" fill="none" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Cpath d="M80 38v22l15 10" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="80" cy="60" r="5" fill="%23059669"/%3E%3Cpath d="M35 60h12M113 60h12" stroke="%230f172a" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3C/svg%3E',
    imageAlt: 'Circular render lifecycle clock',
    title: 'Rendering Lifecycle',
    description:
      'Trace how React renders, commits, and updates UI when state or props change.',
    level: 'beginner' as const,
    href: '/fundamentals/rendering-lifecycle',
  },
  {
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M55 39h61M55 60h61M55 81h61" stroke="%230f172a" stroke-width="4" stroke-linecap="round"/%3E%3Cpath d="M36 31h18v16H36zM36 52h18v16H36zM36 73h18v16H36z" fill="none" stroke="%23059669" stroke-width="3" stroke-linejoin="round"/%3E%3Cpath d="M42 39h7M42 60h7M42 81h7" stroke="%23059669" stroke-width="3" stroke-linecap="round"/%3E%3Cpath d="M119 39h8M119 60h8M119 81h8" stroke="%230891b2" stroke-width="3" stroke-linecap="round"/%3E%3Ccircle cx="130" cy="39" r="3" fill="%230891b2"/%3E%3Ccircle cx="130" cy="60" r="3" fill="%230891b2"/%3E%3Ccircle cx="130" cy="81" r="3" fill="%230891b2"/%3E%3C/svg%3E',
    imageAlt: 'List rows with stable key labels',
    title: 'Why Keys',
    description:
      'Learn why keys help React identify list items across inserts, deletes, and reorders.',
    level: 'beginner' as const,
    href: '/fundamentals/why-keys',
  },
  {
    imageSrc:
      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 120"%3E%3Cpath d="M80 28v26M80 54H53M80 54h27" fill="none" stroke="%230f172a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/%3E%3Crect x="57" y="20" width="46" height="24" rx="8" fill="none" stroke="%23059669" stroke-width="4"/%3E%3Crect x="35" y="70" width="36" height="25" rx="9" fill="none" stroke="%230f172a" stroke-width="4"/%3E%3Crect x="89" y="70" width="36" height="25" rx="9" fill="none" stroke="%230f172a" stroke-width="4"/%3E%3Cpath d="M61 65 53 54l-8 11M99 65l8-11 8 11" fill="none" stroke="%230891b2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/%3E%3Ccircle cx="80" cy="32" r="5" fill="%23059669"/%3E%3Cpath d="M70 82h20" stroke="%230891b2" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 6"/%3E%3C/svg%3E',
    imageAlt: 'State lifted from child cards into a parent',
    title: 'Lifting State Up',
    description:
      'Move shared state to a common parent so sibling components stay in sync.',
    level: 'intermediate' as const,
    href: '/fundamentals/lifting-state-up',
  },
]

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
              section="fundamentals"
              title={card.title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
