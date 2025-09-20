'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { getCurrentUser } from '@/lib/api/clientApi';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();
        if (response.user) {
          setUser(response.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };

    checkAuth();
  }, [setUser]);

  return <>{children}</>;
}