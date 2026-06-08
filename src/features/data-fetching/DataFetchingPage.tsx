import { LabTopicsSection as LabSectionPage } from "@/components/shared/lab-topics-section/LabTopicsSection";
import { overview } from "./data-fetching.data";

function DataFetchingPage() {
  return (
    <LabSectionPage
      description={overview.description}
      eyebrow={overview.eyebrow}
      title={overview.title}
      topics={overview.topics}
    />
  );
}

export { DataFetchingPage };
