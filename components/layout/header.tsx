"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useRoute from "../providers/hooks/use-route";
import { logout } from "@/store/auth";
import ThemeChanger from "./theme-changer";
import AppBreadcrumbs from "./breadcrumbs";
import { useCommonStore } from "@/store/common";
import { Menu } from "lucide-react";

export default function Header() {
  const { navigate } = useRoute();
  const { toggleSidebar } = useCommonStore();
  return (
    <header className="flex h-16 items-center justify-between px-4 border-b shadow-sm">
      <div className="flex items-center gap-2 flex-1">
        {/* Sidebar toggle for small screens */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Breadcrumbs */}
        <AppBreadcrumbs />
      </div>
      <div className="flex items-center gap-2">
        <ThemeChanger />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={(e) => {
                e.preventDefault();
                logout();
                navigate("/auth");
              }}
            >
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
