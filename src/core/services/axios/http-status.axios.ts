import { message } from "ant-design-vue";
import { i18n } from "@/plugins/i18n";
import { notificationInstance } from "@/shared/composables/useNotifications";
import { HttpStatusCode, type AxiosError, type AxiosResponse } from "axios";
const showNotifyError = (errorRes: AxiosError) => {
  console.log("error::", errorRes);

  const { code, message, error } = errorRes?.response?.data ? (errorRes.response.data as any) : null;
  const statusCode = code ? HttpStatusCode[code] : "";
  const messageDetail = error && Object.keys(error).length ? error.message : "";

  switch (statusCode) {
    case "BadRequest":
      // Error 400
      notificationInstance("error", {
        message: message,
        description: messageDetail,
      });
      break;
    case "Unauthorized":
      // Error 401
      notificationInstance("error", {
        message: message,
        description: messageDetail,
      });
      break;
    case "Forbidden":
      // Error 403
      notificationInstance("error", {
        message: message,
        description: messageDetail,
      });
      break;
    case "NotFound":
      // Error 404
      notificationInstance("error", {
        message: message,
        description: messageDetail,
      });
      // router.push({ name: "Error404" }).then();

      break;
    case "TooManyRequests":
      // Error 429
      break;
    case "InternalServerError":
      // Error 500
      notificationInstance("error", {
        message: message,
        description: messageDetail,
      });
      break;
    case "NotImplemented":
      // Error 501
      break;
    case "BadGateway":
      // Error 502
      break;
    case "ServiceUnavailable":
      // Error 503
      break;
    default:
      break;
  }
};

const showNotifySuccess = (response: AxiosResponse) => {
  const statusCode = HttpStatusCode[response?.status];

  switch (statusCode) {
    case "Ok":
      notificationInstance("success", {
        message: i18n.global.t("COMMON.NOTIFY.SUCCESS_TITLE"),
        description: i18n.global.t("COMMON.NOTIFY.SUCCESS_DESC"),
      });
      break;
    default:
      break;
  }
};
export { showNotifySuccess, showNotifyError };
