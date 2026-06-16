'use client';

import { useRouter } from 'next/navigation';
import AuthPromptModal from '@/components/AuthPromptModal/AuthPromptModal';

export default function AuthPromptModalPage() {
  const router = useRouter();

  return <AuthPromptModal onClose={() => router.back()} />;
}