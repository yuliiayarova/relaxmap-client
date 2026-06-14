import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationById } from '@/lib/api/client/locationsApi';
import EditLocationPage from './EditLocationPage';

export const metadata: Metadata = {
  title: 'Редагування локації | Relax Map',
  description: 'Сторінка редагування даних локації Relax Map.',
};

interface EditLocationRouteProps {
  params: Promise<{ id: string }> | { id: string };
}

export default async function EditLocationRoute({
  params,
}: EditLocationRouteProps) {
  const { id } = await params;
  let location;

  try {
    location = await getLocationById(id);
  } catch {
    notFound();
  }

  return <EditLocationPage location={location} />;
}
