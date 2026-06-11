import type { Metadata } from 'next';
import CreateLocationPage from './CreateLocationPage';

export const metadata: Metadata = {
  title: 'Додавання нового місця | Relax Map',
  description: 'Сторінка створення нової локації Relax Map.',
};

export default function AddLocationRoute() {
  return <CreateLocationPage />;
}
