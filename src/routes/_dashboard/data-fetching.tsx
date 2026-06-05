import { createFileRoute } from "@tanstack/react-router";
import { LabSectionPage } from "@/components/LabSectionPage";

export const Route = createFileRoute("/_dashboard/data-fetching")({
  component: DataFetchingPage,
});

function DataFetchingPage() {
  return (
    <LabSectionPage
      description="Model remote data as cacheable, invalidatable server state instead of manual loading flags everywhere."
      eyebrow="Remote Data"
      labs={[
        "TanStack Query todo list",
        "Optimistic mutation",
        "Pagination and prefetching",
        "Offline and retry states",
      ]}
      title="Data Fetching"
      topics={[
        "TanStack Query",
        "Queries",
        "Mutations",
        "Cache invalidation",
        "Optimistic updates",
        "Loading and error states",
      ]}
    />
  );
}
