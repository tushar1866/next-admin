import { create } from "zustand";
import { Theme, themes } from "@/components/themes";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: themes[0],
  setTheme: (theme) => set({ theme }),
}));
