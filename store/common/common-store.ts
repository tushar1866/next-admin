import { create, StateCreator } from "zustand";
import { CommonStoreState, LayoutSlice, ThemeSlice } from "./types";
import { themes } from "@/lib/constants/themes";

const layoutSlice: StateCreator<LayoutSlice, [], [], LayoutSlice> = (set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
});

const themeSlice: StateCreator<ThemeSlice, [], [], ThemeSlice> = (set) => ({
  theme: themes[0],
  setTheme: (theme) => set({ theme }),
});

export const useCommonStore = create<CommonStoreState>((...a) => ({
  ...layoutSlice(...a),
  ...themeSlice(...a),
}));
