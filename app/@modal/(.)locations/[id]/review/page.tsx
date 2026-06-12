'use client';

import { useRouter } from 'next/navigation';
import ModalBackdrop from '@/components/ModalBackdrop/ModalBackdrop';
import AddReviewForm from '@/components/AddReviewForm/AddReviewForm';

interface ReviewModalPageProps {
  params: {
    id: string;
  };
}

export default function ReviewModalPage({ params }: ReviewModalPageProps) {
  const router = useRouter();

  return (
    <ModalBackdrop isOpen onClose={() => router.back()}>
      <AddReviewForm locationId={params.id} />
    </ModalBackdrop>
  );
}
