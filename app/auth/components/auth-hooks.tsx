import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { SignInAPI, SignUpAPI } from "@/lib/apis/services";
import { SignInFormValues, SignUpFormValues } from "@/lib/validations/auth";
import { AxiosResponse } from "axios";
import {
  showErrorToast,
  showSuccessToast,
} from "@/components/providers/hooks/use-toast";
import { useRouter } from "next/navigation";
export const useSignUp = (): UseMutationResult<
  AxiosResponse,
  Error,
  SignUpFormValues
> => {
  return useMutation({
    mutationFn: (data) => SignUpAPI(data),
    onSuccess: (data) => {
      console.log("Registered:", data);
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

export const useSignIn = (): UseMutationResult<
  AxiosResponse,
  Error,
  SignInFormValues
> => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data) => SignInAPI(data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.accessToken);
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
