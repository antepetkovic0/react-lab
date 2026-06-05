import { createFileRoute } from "@tanstack/react-router";
import { LabSectionPage } from "@/components/LabSectionPage";

export const Route = createFileRoute("/_dashboard/architecture")({
  component: ArchitecturePage,
});

function ArchitecturePage() {
  return (
    <LabSectionPage
      description="Shape a React codebase so features, shared UI, data access, and configuration stay understandable as the app grows."
      eyebrow="System Design"
      labs={[
        "Feature folder refactor",
        "Error boundary strategy",
        "Environment config setup",
        "API client organization",
      ]}
      title="Architecture"
      topics={[
        "Feature modules",
        "Shared component boundaries",
        "Error boundaries",
        "Environment variables",
        "API layers",
        "Dependency organization",
      ]}
    />
  );
}
