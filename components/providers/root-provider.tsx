"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";
import { AuthProvider } from "./auth-provider";
import { AlertProvider } from "./alert-provider";

function RootProvider({ children }: { readonly children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: 1,
            staleTime: 1000 * 60 * 5,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </AlertProvider>
    </QueryClientProvider>
  );
}

export default RootProvider;
