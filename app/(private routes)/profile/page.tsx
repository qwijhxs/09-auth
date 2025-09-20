import { Metadata } from 'next';
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

export default function Profile() {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <a href="#" className={css.editProfileButton}>
            Edit Profile
          </a>
        </div>
        <div className={css.avatarWrapper}>
          <img
            src="/avatar-placeholder.png"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: your_username
          </p>
          <p>
            Email: your_email@example.com
          </p>
        </div>
      </div>
    </main>
  );
}