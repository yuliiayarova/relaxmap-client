import type { Metadata } from 'next';
import CreateLocationPage from './CreateLocationPage';

export const metadata: Metadata = {
  title: 'Add a Location | RelaxMap',
  description:
    'Create and share a new recreational location with the RelaxMap community.',
};

export default function AddLocationRoute() {
  return <CreateLocationPage />;
}
