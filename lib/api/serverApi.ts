import { api } from './api';
import { headers } from 'next/headers';
import { User } from '@/types/user';

const getServerCookies = async (): Promise<string> => {
  const headersList = await headers();
  const cookie = headersList.get('cookie');
  return cookie || '';
};

export const serverAuthApi = {
  getCurrentUser: async (): Promise<{ user: User }> => {
    const cookies = await getServerCookies();

    const response = await api.get<{ user: User }>('/auth/me', {
      headers: {
        Cookie: cookies,
      },
    });
    return response.data;
  },

  login: async (): Promise<{ user: User }> => {
    const response = await api.post<{ user: User }>('/auth/login');
    return response.data;
  },

  register: async (): Promise<{ user: User }> => {
    const response = await api.post<{ user: User }>('/auth/register');
    return response.data;
  },
};