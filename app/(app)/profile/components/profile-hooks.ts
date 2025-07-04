import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthMeAPI } from "@/lib/apis/services";
import { useAuthStore } from "@/store/auth/auth-store";

export function useProfile() {
  const { user, setUser } = useAuthStore();
  return useQuery({
    queryKey: ["profile"],
    queryFn: AuthMeAPI,
    enabled: !!user,
    // @ts-expect-error react-query onSuccess typing is too strict for setUser usage
    onSuccess(data) {
      setUser(data, "", "");
    },
  });
}

export function useUpdateProfile(
  mutationFn: (data: Record<string, unknown>) => Promise<unknown>
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
