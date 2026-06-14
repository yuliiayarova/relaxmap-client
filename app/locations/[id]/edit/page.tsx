import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLocationById } from '@/lib/api/client/locationsApi';
import EditLocationPage from './EditLocationPage';

export const metadata: Metadata = {
  title: 'Edit Location | RelaxMap',
  description: 'Update location details, photos, and information on RelaxMap.',
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
