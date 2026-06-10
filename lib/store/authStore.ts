import { create } from 'zustand';

import { AuthUser } from '../api/types/userTypes';
import { logout } from '../api/client/authApiClient';

type AuthStore = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isAuthChecked: boolean;
  isAuthLoading: boolean;

  setUser: (user: AuthUser) => void;
  clearAuth: () => void;
  setAuthChecked: (value: boolean) => void;

  logoutUser: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>()((set) => ({
  isAuthenticated: false,
  user: null,
  isAuthChecked: false,
  isAuthLoading: false,

  setUser: (user) => {
    set({
      user,
      isAuthenticated: true,
    });
  },

  clearAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
    });
  },

  setAuthChecked: (value) => {
    set({
      isAuthChecked: value,
    });
  },

  logoutUser: async () => {
    set({
      isAuthLoading: true,
    });

    try {
      await logout();

      set({
        user: null,
        isAuthenticated: false,
      });
    } finally {
      set({
        isAuthLoading: false,
      });
    }
  },
}));
