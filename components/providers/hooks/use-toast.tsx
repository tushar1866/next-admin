import { ReactNode } from "react";
import { ExternalToast, toast } from "sonner";

const showSuccessToast = (
  message: string | ReactNode,
  data?: ExternalToast
) => {
  toast.success(message, data);
};

const showErrorToast = (message: string | ReactNode, data?: ExternalToast) => {
  toast.error(message, data);
};

const showInfoToast = (message: string | ReactNode, data?: ExternalToast) => {
  toast(message, data);
};

function showPromiseToast<T>(
  promise: Promise<T>,
  messages: { loading: string; success: string; error: string }
) {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
}

export { showSuccessToast, showErrorToast, showInfoToast, showPromiseToast };
