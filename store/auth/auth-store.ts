import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { User } from "../../types/user";

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User, token: string, refreshToken?: string) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      setUser: (user: User, token: string, refreshToken?: string) =>
        set({
          user,
          token,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
        }),
      clearUser: () =>
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage",
      // Only persist user, token, and isAuthenticated, not the methods
      partialize: (state: AuthState) => ({
        user: state.user ?? null,
        token: state.token ?? null,
        refreshToken: state.refreshToken ?? null,
        isAuthenticated: !!state.isAuthenticated,
      }),
    }
  )
);
