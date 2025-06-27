"use client";

import { sidebarLinks } from "@/lib/constants/nav";
import { LayoutDashboard, Users, Settings, Boxes } from "lucide-react";
import { Button } from "../ui/button";
import useRoute from "../providers/hooks/use-route";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const icons = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  settings: Settings,
  boxes: Boxes,
};

export function Sidebar() {
  const { navigate } = useRoute();
  const pathname = usePathname();
  return (
    <aside className="h-full max-w-3xs min-w-48 border-r hidden md:block">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <nav className="flex flex-col space-y-1 p-2">
        {sidebarLinks.map((item) => {
          const Icon = icons[item.icon as keyof typeof icons];
          return (
            <Button
              type="button"
              variant={"ghost"}
              key={item.href}
              onClick={() => {
                navigate(item.href);
              }}
              className={cn(
                "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md justify-start",
                pathname === item.href
                  ? "bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
                  : "hover:bg-primary-foreground/50 hover:text-muted"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </aside>
  );
}
