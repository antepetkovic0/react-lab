import { createFileRoute } from "@tanstack/react-router";
import { LabSectionPage } from "@/components/LabSectionPage";

export const Route = createFileRoute("/_dashboard/fundamentals")({
  component: FundamentalsPage,
});

function FundamentalsPage() {
  return (
    <LabSectionPage
      description="Cover the primitives every React developer needs before reaching for ecosystem libraries."
      eyebrow="Core React"
      labs={[
        "Component composition",
        "Props and children patterns",
        "Conditional rendering drills",
        "Event handling practice",
      ]}
      title="React Fundamentals"
      topics={[
        "JSX",
        "Components",
        "Props",
        "Children",
        "Rendering lists",
        "Event handling",
      ]}
    />
  );
}
