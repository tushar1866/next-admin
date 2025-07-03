import { Theme } from "@/types/common";

export interface LayoutSlice {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}
export interface ThemeSlice {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
export type CommonStoreState = LayoutSlice & ThemeSlice;
