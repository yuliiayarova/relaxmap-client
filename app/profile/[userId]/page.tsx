import { Metadata } from 'next';
import ProfilePageClient from './ProfilePage.client';
import { getUserById } from '@/lib/api/client/usersApi';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>;
}): Promise<Metadata> {
  const { userId } = await params;

  try {
    const response = await getUserById(userId);
    const user = response.data;

    return {
      title: `${user.name} | RelaxMap`,
      description: `${user.name}'s profile on RelaxMap.`,
    };
  } catch {
    return {
      title: 'Profile | RelaxMap',
    };
  }
}

export default function ProfilePage() {
  return <ProfilePageClient />;
}
