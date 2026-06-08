import { createFileRoute } from '@tanstack/react-router'
import { ComponentsJsxPage } from '@/features/fundamentals/components-jsx/ComponentsJsxPage'

export const Route = createFileRoute('/_dashboard/fundamentals/components-jsx')(
  {
    component: ComponentsJsxPage,
  },
)
