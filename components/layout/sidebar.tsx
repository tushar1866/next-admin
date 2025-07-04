"use client";
import { sidebarLinks } from "@/lib/constants/nav";
import {
  LayoutDashboard,
  Users,
  Settings,
  Boxes,
  Newspaper,
} from "lucide-react";
import { Button } from "../ui/button";
import useRoute from "../providers/hooks/use-route";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCommonStore } from "@/store/common";

const icons = {
  "layout-dashboard": LayoutDashboard,
  users: Users,
  settings: Settings,
  boxes: Boxes,
  newspaper: Newspaper,
};

export function Sidebar() {
  const { navigate } = useRoute();
  const { sidebarOpen, toggleSidebar } = useCommonStore();

  const pathname = usePathname();
  return (
    <>
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => toggleSidebar()}
          onKeyDown={() => {
            console.log("Nothing");
          }}
          aria-label="Close sidebar overlay"
        />
      )}
      <aside
        className={cn(
          "h-full max-w-3xs min-w-48 border-r md:block",
          `${sidebarOpen ? "block" : "hidden"}`,
          `max-md:absolute left-0 top-0 bg-background z-50`
        )}
      >
        <div className="px-4 text-xl font-bold flex items-center justify-center">
          <Image src={"/logo-only.svg"} alt="logo" height={80} width={80} />
        </div>
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
                  if (window.innerWidth < 768) toggleSidebar();
                }}
                className={cn(
                  "flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-md justify-start",
                  pathname === item.href
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary"
                    : "hover:bg-primary-foreground/50 hover:text-muted dark:hover:bg-primary-foreground dark:hover:text-primary/80"
                )}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
