import type { AxiosError } from "axios";
import { onLoading } from "@/hooks/event/useLoading";

const onRequestError = (error: Error | AxiosError): Promise<AxiosError> => {
  onLoading("cancel");

  return Promise.reject(error);
};

export { onRequestError };
