import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { serverAuthApi } from '@/lib/api/serverApi';
import css from './page.module.css';

export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'Manage your NoteHub profile, view your personal information and edit your account settings.',
  keywords: 'profile, account, settings, user, NoteHub',
  openGraph: {
    title: 'Profile | NoteHub',
    description: 'Manage your NoteHub profile and account settings',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'Profile | NoteHub',
    description: 'Manage your NoteHub profile and account settings',
  },
  robots: 'noindex, nofollow',
};

export default async function Profile() {
  const { user } = await serverAuthApi.getCurrentUser();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar || "/avatar-placeholder.png"}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: {user.username}
          </p>
          <p>
            Email: {user.email}
          </p>
        </div>
      </div>
    </main>
  );
}