/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

const getErrorMessage = (err: any): string => {
  if (err?.status === "PARSING_ERROR") {
    return "Invalid server response. Please try again later.";
  }
  if (err?.status === "FETCH_ERROR") {
    return "Unable to connect to the server. Please check your connection and try again.";
  }

  const errorSources =
    err?.data?.errorSources ||
    err?.error?.data?.errorSources ||
    err?.errorSources ||
    err?.data?.errors ||
    err?.error?.data?.errors;
  if (Array.isArray(errorSources) && errorSources.length > 0) {
    return errorSources
      .map((source: any) => {
        const field = source.path ? `${source.path}: ` : "";
        return `${field}${source.message}`;
      })
      .join(", ");
  }

  return (
    err?.data?.message ||
    err?.error?.data?.message ||
    err?.message ||
    err?.error?.message ||
    "Something went wrong"
  );
};

export const handleAsyncWithToast = async (
  asyncCallback: () => Promise<any>,
  isShowToast: boolean = true,
  loadingMessage?: string,
  successMessage?: string,
  errorMessage?: string
) => {
  let toastInit: string | number | undefined;

  if (isShowToast) {
    toastInit = toast.loading(loadingMessage || "Loading...");
  }

  try {
    const res = await asyncCallback();

    if (isShowToast) {
      if (res?.data?.success || res?.success) {
        toast.success(res?.data?.message || res?.message || successMessage, {
          id: toastInit,
        });
      } else if (res?.error) {
        const msg = getErrorMessage(res);
        toast.error(msg, {
          id: toastInit,
        });
      } else if (res?.data?.success === false || res?.success === false) {
        const msg = getErrorMessage(res);
        toast.error(msg, {
          id: toastInit,
        });
      }
    }

    return res;
  } catch (error) {
    if (isShowToast) {
      const msg = getErrorMessage(error);
      toast.error(msg || errorMessage || "Something went wrong", {
        id: toastInit,
      });
    }
    throw error;
  } finally {
    if (isShowToast) {
      setTimeout(() => {
        toast.dismiss(toastInit);
      }, 3500);
    }
  }
};
