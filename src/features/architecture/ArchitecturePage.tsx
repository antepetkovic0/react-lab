import { LabTopicsSection as LabSectionPage } from "@/components/shared/lab-topics-section/LabTopicsSection";
import { overview } from "./architecture.data";

function ArchitecturePage() {
  return (
    <LabSectionPage
      description={overview.description}
      eyebrow={overview.eyebrow}
      title={overview.title}
      topics={overview.topics}
    />
  );
}

export { ArchitecturePage };
