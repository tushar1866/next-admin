import { useAuthStore } from "./auth-store";
import type { User } from "../../types/user";

export const login = (user: User, token: string, refreshToken?: string) => {
  useAuthStore.getState().setUser(user, token, refreshToken);
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refresh_token", refreshToken);
  }
};

export const logout = () => {
  useAuthStore.getState().clearUser();
  // Optionally clear tokens from localStorage for extra safety
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
  }
};

export const getSession = () => {
  const { user, token, isAuthenticated } = useAuthStore.getState();
  return { user, token, isAuthenticated };
};
