import { useRouter } from "next/navigation";
import { useTransition } from "react";

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
