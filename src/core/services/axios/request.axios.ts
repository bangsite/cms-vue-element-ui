import type { InternalAxiosRequestConfig } from "axios";
import { i18n } from "@/plugins/i18n";

import { onLoading } from "@/shared/composables/useLoading";

const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { headers } = config;

    onLoading("start");

    const token = sessionStorage.getItem("token");

    if (headers) {
        headers.Authorization = "Bearer " + token;
        // headers.locale = i18n.global.locale.value;
        headers["Accept-Language"] = i18n.global.locale.value;
    }

    if (config?.data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
    } else {
        headers["Content-Type"] = "application/json";
    }

    return config;
};

export { onRequest };
