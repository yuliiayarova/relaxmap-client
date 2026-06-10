import { create } from 'zustand';
import { logout, refreshSessionClient } from '@/lib/api/client/authApiClient';

interface RefreshSessionResponse {
  success: boolean;
}

interface AuthStore {
  isLoggedIn: boolean;
  isAuthChecked: boolean;
  isAuthLoading: boolean;
  logoutError: string | null;
  checkAuth: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  isAuthChecked: false,
  isAuthLoading: false,
  logoutError: null,

  checkAuth: async () => {
    set({ isAuthLoading: true });

    try {
      const response = await refreshSessionClient();
      const data = response.data as RefreshSessionResponse;

      set({
        isLoggedIn: Boolean(data.success),
        isAuthChecked: true,
        logoutError: null,
      });
    } catch {
      set({
        isLoggedIn: false,
        isAuthChecked: true,
      });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  logoutUser: async () => {
    set({ isAuthLoading: true, logoutError: null });

    try {
      await logout();
    } catch (error) {
      set({
        logoutError:
          error instanceof Error ? error.message : 'Failed to logout',
      });
    } finally {
      set({
        isLoggedIn: false,
        isAuthChecked: true,
        isAuthLoading: false,
      });
    }
  },
}));
