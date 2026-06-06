import { createFileRoute } from '@tanstack/react-router'
import { LabCard } from '@/components/shared/lab-card/LabCard'
import { popularLabs } from '@/content/labs'

export const Route = createFileRoute('/_dashboard/')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          ReactLab
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            React Lab Dashboard
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            A focused playground for learning React concepts through small,
            practical labs.
          </p>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="popular-labs-heading">
        <h2
          className="font-heading text-lg font-semibold tracking-tight"
          id="popular-labs-heading"
        >
          Most Popular Labs
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularLabs.map((lab) => (
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
