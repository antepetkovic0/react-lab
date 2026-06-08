import { LabCard } from "@/components/shared/lab-card/LabCard";
import { labs, overview } from "./dashboard.data";

function DashboardPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <section className="max-w-3xl space-y-3">
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">
          {overview.eyebrow}
        </p>
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-balance">
            {overview.title}
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            {overview.description}
          </p>
        </div>
      </section>

      <section className="space-y-4" aria-labelledby="popular-labs-heading">
        <h2
          className="text-xs font-semibold tracking-wide text-primary uppercase"
          id="popular-labs-heading"
        >
          Most Popular Labs
        </h2>

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
  );
}

export { DashboardPage };
