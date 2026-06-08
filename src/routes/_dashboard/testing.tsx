import { createFileRoute } from '@tanstack/react-router'
import { TestingPage } from '@/features/testing/TestingPage'

export const Route = createFileRoute('/_dashboard/testing')({
  component: TestingPage,
})
