import { createFileRoute } from '@tanstack/react-router'
import { WhyKeysPage } from '@/features/fundamentals/why-keys/WhyKeysPage'

export const Route = createFileRoute('/_dashboard/fundamentals/why-keys')({
  component: WhyKeysPage,
})
