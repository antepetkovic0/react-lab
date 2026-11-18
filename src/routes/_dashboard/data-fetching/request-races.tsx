import { createFileRoute } from '@tanstack/react-router';
import { RequestRacesPage } from '@/features/data-fetching/request-races/RequestRacesPage';

export const Route = createFileRoute('/_dashboard/data-fetching/request-races')(
  {
    component: RequestRacesPage,
  },
);
