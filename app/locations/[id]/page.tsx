import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getLocationById } from '@/lib/api/client/locationsApi';
import LocationDetailsPageClient from './LocationDetailsPage.client';

interface LocationDetailsPageProps {
  params: Promise<{ locationId: string }> | { locationId: string };
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { locationId } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['locationId', locationId],
    queryFn: () => getLocationById(locationId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationDetailsPageClient locationId={locationId} />
    </HydrationBoundary>
  );
}
