import { Outlet, useRouterState } from '@tanstack/react-router';
import { LabCard } from '@/components/shared/lab-card/LabCard';
import { LabTopicsSection } from '@/components/shared/lab-topics-section/LabTopicsSection';
import { labs, overview } from './data-fetching.data';

function DataFetchingPage() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  if (pathname !== '/data-fetching') {
    return <Outlet />;
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <LabTopicsSection
        description={overview.description}
        eyebrow={overview.eyebrow}
        title={overview.title}
        topics={overview.topics}
      />

      <section aria-labelledby="data-fetching-labs" className="space-y-4">
        <h2
          className="text-xs font-semibold tracking-wide text-primary uppercase"
          id="data-fetching-labs"
        >
          Lab Cards
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {labs.map((lab) => (
            <LabCard
              className="w-full"
              description={lab.description}
              href={lab.href}
              imageAlt={lab.imageAlt}
              imageSrc={lab.imageSrc}
              key={lab.id}
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

export { DataFetchingPage };
