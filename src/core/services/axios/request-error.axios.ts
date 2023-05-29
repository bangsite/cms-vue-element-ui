import type { AxiosError } from "axios";
import { onLoading } from "@/shared/composables/useLoading";

const onRequestError = (error: Error | AxiosError): Promise<AxiosError> => {
    onLoading("cancel");

    return Promise.reject(error);
};

export { onRequestError };
