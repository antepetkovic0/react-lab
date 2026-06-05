import { createFileRoute } from "@tanstack/react-router";
import { LabSectionPage } from "@/components/LabSectionPage";

export const Route = createFileRoute("/_dashboard/performance")({
  component: PerformancePage,
});

function PerformancePage() {
  return (
    <LabSectionPage
      description="Measure before optimizing, then apply the right React and browser performance patterns."
      eyebrow="Speed"
      labs={[
        "React Profiler walkthrough",
        "Memoization tradeoff demo",
        "Route code splitting",
        "Virtualized large list",
      ]}
      title="Performance"
      topics={[
        "Profiling",
        "Memoization",
        "Code splitting",
        "Virtualization",
        "Render waterfalls",
        "Bundle size",
      ]}
    />
  );
}
