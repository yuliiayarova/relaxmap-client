import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getLocationById } from '@/lib/api/client/locationsApi';
import LocationDetailsPageClient from './LocationDetailsPage.client';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: LocationDetailsPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const location = await getLocationById(id);

    const description = location.description || '';

    const image =
      location.image ||
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/images/hero-desktop.png`;

    return {
      title: `${location.name} | RelaxMap`,
      description:
        description.length > 160
          ? `${description.slice(0, 157)}...`
          : description,

      openGraph: {
        title: location.name,
        description: description.slice(0, 160),
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/locations/${id}`,
        siteName: 'RelaxMap',
        type: 'website',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: location.name,
          },
        ],
      },
    };
  } catch (error) {
    console.error('Metadata error:', error);

    return {
      title: 'Location Details | RelaxMap',
      description: 'Explore recreational locations on RelaxMap.',
    };
  }
}

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
