'use client';

import { login } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import css from './page.module.css';

export default function SignIn() {
  const [error, setError] = useState('');

  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as { email: string; password: string };
      const res = await login(formValues);
      if (res && res.user) {
        setUser(res.user);
        router.replace('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log('error', error);
      setError('Invalid email or password');
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign in</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required className={css.input} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required className={css.input} />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}