import { create } from 'zustand';
import { AuthUser } from '../api/types/userTypes';

type AuthStore = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isAuthChecked: boolean;
  setUser: (user: AuthUser) => void;
  clearIsAuthenticated: () => void;
  setAuthChecked: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  isAuthChecked: false,

  setUser: (user: AuthUser) => {
    set(() => ({ user, isAuthenticated: true }));
  },

  clearIsAuthenticated: () => {
    set(() => ({ user: null, isAuthenticated: false }));
  },

  setAuthChecked: (value: boolean) => {
    set(() => ({ isAuthChecked: value }));
  },
}));
