import { createFileRoute } from '@tanstack/react-router';
import { GenericComponentsPage } from '@/features/ui-patterns/generic-components/GenericComponentsPage';

export const Route = createFileRoute(
  '/_dashboard/ui-patterns/generic-components',
)({
  component: GenericComponentsPage,
});
