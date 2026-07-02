import { Outlet, useRouterState } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'
import { labs, overview } from './forms-validation.data'

function FormsValidationPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  })

  if (pathname !== '/forms-validation') {
    return <Outlet />
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabSectionPage
        description={overview.description}
        eyebrow={overview.eyebrow}
        title={overview.title}
        topics={overview.topics}
      />

      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">
            Lab Cards
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab) => (
            <LabCard
              className="w-full"
              description={lab.description}
              href={lab.href}
              imageAlt={lab.imageAlt}
              imageSrc={lab.imageSrc}
              key={lab.title}
              level={lab.level}
              section={lab.section}
              title={lab.title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export { FormsValidationPage }
