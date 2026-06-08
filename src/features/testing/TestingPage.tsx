import { LabTopicsSection as LabSectionPage } from "@/components/shared/lab-topics-section/LabTopicsSection";
import { overview } from "./testing.data";

function TestingPage() {
  return (
    <LabSectionPage
      description={overview.description}
      eyebrow={overview.eyebrow}
      title={overview.title}
      topics={overview.topics}
    />
  );
}

export { TestingPage };
