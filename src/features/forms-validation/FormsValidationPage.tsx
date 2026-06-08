import { LabTopicsSection as LabSectionPage } from "@/components/shared/lab-topics-section/LabTopicsSection";
import { overview } from "./forms-validation.data";

function FormsValidationPage() {
  return (
    <LabSectionPage
      description={overview.description}
      eyebrow={overview.eyebrow}
      title={overview.title}
      topics={overview.topics}
    />
  );
}

export { FormsValidationPage };
