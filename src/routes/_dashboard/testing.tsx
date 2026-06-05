import { createFileRoute } from "@tanstack/react-router";
import { LabSectionPage } from "@/components/LabSectionPage";

export const Route = createFileRoute("/_dashboard/testing")({
  component: TestingPage,
});

function TestingPage() {
  return (
    <LabSectionPage
      description="Build confidence with focused tests across components, routes, network behavior, and user flows."
      eyebrow="Confidence"
      labs={[
        "Component test with Testing Library",
        "Mock network states",
        "Route integration test",
        "Playwright E2E smoke test",
      ]}
      title="Testing"
      topics={[
        "Unit tests",
        "Integration tests",
        "E2E tests",
        "Mocking",
        "Accessibility tests",
        "Regression checks",
      ]}
    />
  );
}
