"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useRoute from "../providers/hooks/use-route";
console.log("hello");
export function Header() {
  const { navigate } = useRoute();
  return (
    <header className="flex h-16 items-center justify-between px-4 border-b shadow-sm">
      <div className="text-lg font-semibold">Dashboard</div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Avatar>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Button variant="ghost" className="w-full justify-start">
            Profile
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={(e) => {
              e.preventDefault();
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
