"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

function useRoute() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function navigate(path: string) {
    startTransition(() => {
      router.push(path);
    });
  }
  function replace(path: string) {
    startTransition(() => {
      router.replace(path);
    });
  }
  return { isPending, navigate, replace };
}

export default useRoute;
