import type { AxiosError } from "axios";
import { showNotifyError } from "@/services/config/notify.axios";
import { onLoading } from "@/composables/useLoading";

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  onLoading("cancel");
  showNotifyError(error);

  return Promise.reject(error.response);
};

export { onResponseError };
