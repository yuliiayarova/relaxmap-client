'use client';

import { useRouter } from 'next/navigation';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import AddReviewForm from '@/components/AddReviewForm/AddReviewForm';
import { use } from 'react';
import css from './page.module.css';

interface ReviewModalPageProps {
  params: Promise<{ id: string }>;
}

export default function ReviewModalPage({ params }: ReviewModalPageProps) {
  const router = useRouter();
  const id = use(params).id;

 return (
  <ModalBackdrop
    isOpen
   onClose={() => router.push(`/locations/${id}`)}
    modalClassName={css.reviewModal}
  >
    <AddReviewForm locationId={id} />
  </ModalBackdrop>
);
}
