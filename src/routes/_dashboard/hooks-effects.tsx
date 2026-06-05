import { createFileRoute } from '@tanstack/react-router'
import { LabTopicsSection as LabSectionPage } from '@/components/shared/lab-topics-section/LabTopicsSection'

export const Route = createFileRoute('/_dashboard/hooks-effects')({
  component: HooksEffectsPage,
})

function HooksEffectsPage() {
  return (
    <LabSectionPage
      description="Learn how hooks model state, refs, memoized values, subscriptions, and external synchronization."
      eyebrow="React Runtime"
      labs={[
        'Effect cleanup playground',
        'Custom hook extraction',
        'Ref vs state comparison',
        'Reducer-driven component',
      ]}
      title="Hooks & Effects"
      topics={[
        'useState',
        'useEffect',
        'useRef',
        'useReducer',
        'useMemo and useCallback',
        'Custom hooks',
      ]}
    />
  )
}
