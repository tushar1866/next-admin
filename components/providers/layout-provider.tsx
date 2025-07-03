"use client";
import React, { ReactNode } from "react";
import useRoute from "./hooks/use-route";
import Loader from "../ui/loader";
import Header from "../layout/header";
import { usePathname } from "next/navigation";
import { Sidebar } from "../layout/sidebar";

export function LayoutProvider({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  const { isPending } = useRoute();
  const isPublic = pathname.includes("auth");
  if (isPending) return <Loader />;
  return !isPublic ? (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-4">
          {children}
        </main>
      </div>
    </div>
  ) : (
    children
  );
}
