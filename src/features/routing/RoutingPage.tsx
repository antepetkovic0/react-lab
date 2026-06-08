import { LabTopicsSection as LabSectionPage } from "@/components/shared/lab-topics-section/LabTopicsSection";
import { overview } from "./routing.data";

function RoutingPage() {
  return (
    <LabSectionPage
      description={overview.description}
      eyebrow={overview.eyebrow}
      title={overview.title}
      topics={overview.topics}
    />
  );
}

export { RoutingPage };
