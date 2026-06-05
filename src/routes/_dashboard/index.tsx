import { createFileRoute } from "@tanstack/react-router";
import { LabSectionPage } from "@/components/LabSectionPage";

export const Route = createFileRoute("/_dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <LabSectionPage
      description="A focused playground for learning React concepts through small, practical labs."
      eyebrow="ReactLab"
      labs={[
        "Build the curriculum dashboard",
        "Track section progress",
        "Add searchable lab cards",
        "Create a roadmap view",
      ]}
      title="React Lab Dashboard"
      topics={[
        "React Fundamentals",
        "Hooks & Effects",
        "Routing",
        "Forms & Validation",
        "State Management",
        "Server State",
        "UI Patterns",
        "Performance",
        "Security",
        "Testing",
        "Architecture",
      ]}
    />
  );
}
