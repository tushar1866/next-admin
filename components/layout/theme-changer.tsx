"use client";
import { useEffect } from "react";
import { themes } from "../../lib/constants/themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { SunIcon, MoonIcon } from "lucide-react";
import { useCommonStore } from "@/store/common";
import { Theme } from "@/types/common";

const THEME_KEY = "app-theme";

function applyTheme(theme: Theme) {
  Object.entries(theme.variables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

export default function ThemeChanger() {
  const { theme: selected, setTheme } = useCommonStore();

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      const found = themes.find((t) => t.name === saved);
      if (found) {
        setTheme(found);
        applyTheme(found);
        if (found.varient === "Dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }
  }, [setTheme]);

  const handleChange = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem(THEME_KEY, theme.name);
    applyTheme(theme);

    if (theme.varient === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change theme">
          {selected.varient === "Dark" ? (
            <MoonIcon className="h-5 w-5" />
          ) : (
            <SunIcon className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.name}
            onClick={() => handleChange(theme)}
            className={selected.name === theme.name ? "font-bold" : ""}
          >
            {theme.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
