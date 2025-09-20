import { User } from "@/types/user";
import { create } from "zustand";
type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export type UserType = User | null;

export const useUserStore = create<UserStore>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));