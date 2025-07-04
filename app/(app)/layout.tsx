"use client";
import React, { ReactNode } from "react";
import Header from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import useRoute from "@/components/providers/hooks/use-route";
import Loader from "@/components/ui/loader";

function AppLayout({ children }: { readonly children: ReactNode }) {
  const { isPending } = useRoute();

  if (isPending) return <Loader />;
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-background p-4">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
