import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

export interface User {
  id: string;
  email: string;
  username: string;
  fullName?: string;
  avatarUrl?: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isHydrated: boolean;
  
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isHydrated: false,

  setUser: (user) => set({ user }),
  
  setToken: (token) => set({ token }),
  
  clearAuth: () => set({ user: null, token: null }),
  
  hydrate: async () => {
    try {
      const token = await SecureStore.getItemAsync('auth_token');
      if (token) {
        set({ token, isHydrated: true });
      } else {
        set({ isHydrated: true });
      }
    } catch (error) {
      console.error('Failed to hydrate auth store:', error);
      set({ isHydrated: true });
    }
  },
}));
