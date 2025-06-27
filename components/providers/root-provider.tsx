"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";
import { AuthProvider } from "./auth-provider";
import SuspenseProvider from "./suspense-provider";
import { AlertProvider } from "./alert-provider";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 min
    },
  },
});
function RootProvider({ children }: { readonly children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuspenseProvider>
        <AuthProvider>
          <AlertProvider>
            <Toaster />
            {children}
          </AlertProvider>
        </AuthProvider>
      </SuspenseProvider>
    </QueryClientProvider>
  );
}

export default RootProvider;
