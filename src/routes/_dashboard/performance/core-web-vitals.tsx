import { createFileRoute } from '@tanstack/react-router'
import { CoreWebVitalsPage } from '@/features/performance/core-web-vitals/CoreWebVitalsPage'

export const Route = createFileRoute('/_dashboard/performance/core-web-vitals')(
  {
    component: CoreWebVitalsPage,
  },
)
