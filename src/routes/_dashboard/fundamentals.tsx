import { createFileRoute } from '@tanstack/react-router'
import { LabSectionPage } from '@/components/LabSectionPage'
import { LabCard } from '@/components/shared'

export const Route = createFileRoute('/_dashboard/fundamentals')({
  component: FundamentalsPage,
})

function FundamentalsPage() {
  return (
    <>
      <LabSectionPage
        description="Cover the primitives every React developer needs before reaching for ecosystem libraries."
        eyebrow="Core React"
        labs={[
          'Component composition',
          'Props and children patterns',
          'Conditional rendering drills',
          'Event handling practice',
        ]}
        title="Fundamentals"
        topics={[
          'JSX',
          'Components',
          'Props',
          'Children',
          'Rendering lists',
          'Event handling',
        ]}
      />
      <LabCard
        imageSrc="https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png"
        imageAlt="Component composition"
        title="Component composition"
        description="Learn how to compose components to create more complex ones."
        section="ui-patterns"
        level="advanced"
        href="/fundamentals/component-composition"
      />
    </>
  )
}
