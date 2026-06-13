import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getLocationById } from '@/lib/api/client/locationsApi';
import LocationDetailsPageClient from './LocationDetailsPage.client';

interface LocationDetailsPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function LocationDetailsPage({
  params,
}: LocationDetailsPageProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['location', id],
    queryFn: () => getLocationById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationDetailsPageClient locationId={id} />
    </HydrationBoundary>
  );
}
