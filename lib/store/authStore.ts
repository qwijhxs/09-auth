import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user: User | null) => set({ 
    user,
    isAuthenticated: !!user 
  }),
}));