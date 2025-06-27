"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "../ui/loader";
import { AuthMeAPI } from "@/lib/apis/services";

export function AuthProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const user = await AuthMeAPI();
        const isPublic = pathname.startsWith("/auth");

        if (!user && !isPublic) {
          router.replace("/auth");
        } else if (user && isPublic) {
          router.replace("/dashboard");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  if (isLoading) {
    return <Loader />;
  }
  return <>{children}</>;
}
