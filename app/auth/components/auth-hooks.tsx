import { useMutation } from "@tanstack/react-query";
import { SignInAPI, SignUpAPI } from "@/lib/apis/services";
import { SignInFormValues, SignUpFormValues } from "@/lib/validations/auth";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import { useRouter } from "next/navigation";
import { login } from "@/store/auth";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: SignUpFormValues) => SignUpAPI(data),
    onSuccess: (data) => {
      if (data.user) {
        login(data.user, "", "");
      }
      showSuccessToast("Registration successful", {
        description: "You may now log in.",
      });
    },
    onError: (error) => {
      console.error("Registration failed", error);
      showErrorToast("Registration failed");
    },
  });
};

export const useSignIn = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: SignInFormValues) => SignInAPI(data),
    onSuccess: (data) => {
      if (data.user && data.accessToken) {
        login(data.user, data.accessToken, data.refreshToken);
      }
      showSuccessToast("Login successful");
      router.push("/dashboard");
    },
    onError: (err) => {
      showErrorToast("Login failed", {
        description: err?.message ?? "Invalid credentials",
      });
    },
  });
};
