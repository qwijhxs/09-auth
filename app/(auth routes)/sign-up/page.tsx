'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api/clientApi';
import type { RegisterData } from '@/lib/api/clientApi';
import css from './page.module.css';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const data: RegisterData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      username: formData.get('username') as string,
    };

    try {
      const response = await authApi.register(data);
      console.log('Registration successful:', response.user);

      router.push('/profile');
    } catch (err: unknown) {
      console.error('Registration failed:', err);
      if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        setError((err.response as { data: { message?: string } }).data.message || 'Registration failed. Please try again.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="username">Username</label>
          <input 
            id="username" 
            type="text" 
            name="username" 
            className={css.input} 
            required 
            disabled={isLoading}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            name="email" 
            className={css.input} 
            required 
            disabled={isLoading}
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            name="password" 
            className={css.input} 
            required 
            disabled={isLoading}
            minLength={6}
          />
        </div>

        <div className={css.actions}>
          <button 
            type="submit" 
            className={css.submitButton} 
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
