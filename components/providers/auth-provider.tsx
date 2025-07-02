"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../ui/loader";
import { AuthMeAPI } from "@/lib/apis/services";
import { useAuthStore } from "@/store/auth";

export function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const user = await AuthMeAPI();
        const isPublic = pathname.startsWith("/auth");

        if (!user && !isPublic) {
          clearUser();
          router.replace("/auth");
        } else if (user && isPublic) {
          setUser(user, "");
          router.replace("/dashboard");
        } else if (user) {
          setUser(user, "");
        } else {
          clearUser();
        }
      } catch (error) {
        clearUser();
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router, setUser, clearUser]);

  if (isLoading) {
    return <Loader />;
  }
  return <>{children}</>;
}
