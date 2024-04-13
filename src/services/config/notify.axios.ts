import { type AxiosError, type AxiosResponse, HttpStatusCode } from "axios";
import { ElNotification } from "element-plus";

import { i18n } from "@/plugins/i18n";
import { NOTIFY_CODE } from "@/enums/notifyCode.enum";

const showNotifyError = (errorRes: AxiosError) => {
  const { status, message } = errorRes?.response?.data ? (errorRes.response.data as any) : errorRes;

  const statusCode = status ? "Error " + status : "";

  switch (HttpStatusCode[status]) {
    case "LOCAL_NETWORK":
      ElNotification({
        type: "error",
        title: i18n.global.t("COMMON.NOTIFY.ERROR_TITLE"),
        message: i18n.global.t("COMMON.NOTIFY.ERROR_DESC"),
      });
      break;
    case "ERR_NETWORK":
      ElNotification({
        type: "error",
        title: NOTIFY_CODE[status],
        message: message,
      });
      break;
    //Case 400 for form validate
    default:
      ElNotification({
        type: "error",
        title: statusCode,
        message: message,
      });
      break;
  }
};

const showNotifySuccess = (response: AxiosResponse) => {
  const statusCode = HttpStatusCode[response?.status];

  switch (statusCode) {
    case "Ok":
      ElNotification({
        type: "success",
        title: i18n.global.t("COMMON.NOTIFY.SUCCESS_TITLE"),
        message: i18n.global.t("COMMON.NOTIFY.SUCCESS_DESC"),
      });
      break;
    case "Created":
      ElNotification({
        type: "success",
        title: i18n.global.t("COMMON.NOTIFY.SUCCESS_TITLE"),
        message: i18n.global.t("COMMON.NOTIFY.SUCCESS_DESC"),
      });
      break;
    default:
      break;
  }
};
export { showNotifySuccess, showNotifyError };
