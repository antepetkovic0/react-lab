import { createFileRoute } from '@tanstack/react-router'
import { RenderingLifecyclePage } from '@/features/fundamentals/rendering-lifecycle/RenderingLifecyclePage'

export const Route = createFileRoute(
  '/_dashboard/fundamentals/rendering-lifecycle',
)({
  component: RenderingLifecyclePage,
})
