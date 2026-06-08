import { createFileRoute } from '@tanstack/react-router'
import { DebounceThrottlePage } from '@/features/hooks-effects/debounce-throttle/DebounceThrottlePage'

export const Route = createFileRoute(
  '/_dashboard/hooks-effects/debounce-throttle',
)({
  component: DebounceThrottlePage,
})
