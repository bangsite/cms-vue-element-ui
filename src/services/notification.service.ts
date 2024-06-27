import type { AxiosError, AxiosResponse } from "axios";
import { HttpStatusCode } from "axios";

import { ElNotification } from "element-plus";
import { i18n } from "@/plugins/vue-i18n";
import { ExceptionKeys } from "@/enums/exception";
import { capitalizeFirstLetter } from "@/utils/fortmatString";

class NotificationService {
  public static showError(error: Error | AxiosError) {
    const status = (error as AxiosError)?.response?.status || 0;
    const serverMessage = (error as AxiosError)?.response?.data?.message || error.message;

    const titleKey = this.getErrorTitleKey(status);
    const messageKey = serverMessage || this.getErrorMessageKey(status);

    ElNotification({
      type: "error",
      title: i18n.global.t(`EXCEPTION.${titleKey}.TITLE`),
      message: capitalizeFirstLetter(serverMessage) || i18n.global.t(`EXCEPTION.${messageKey}.MESSAGE`),
    });
  }

  public static showSuccess(response: AxiosResponse) {
    const status = response.status;
    const title = i18n.global.t("COMMON.NOTIFICATIONS.SUCCESS.TITLE");
    const message = response.data.message || i18n.global.t("COMMON.NOTIFICATIONS.SUCCESS.DESCRIPTION");

    if (status === HttpStatusCode.Ok || status === HttpStatusCode.Created) {
      ElNotification({
        type: "success",
        title: title,
        message: message,
      });
    }
  }

  private static getErrorTitleKey(status?: number): string {
    switch (status) {
      case HttpStatusCode.InternalServerError:
        return ExceptionKeys.INTERNAL_SERVER_ERROR;
      case HttpStatusCode.NotFound:
        return ExceptionKeys.NOT_FOUND_ERROR;
      case HttpStatusCode.Unauthorized:
        return ExceptionKeys.UNAUTHORIZED_ERROR;
      case HttpStatusCode.Forbidden:
        return ExceptionKeys.FORBIDDEN_ERROR;
      case HttpStatusCode.BadRequest:
        return ExceptionKeys.VALIDATION_ERROR;
      default:
        // return `Error ${status}`;
        return ExceptionKeys.NETWORK_ERROR;
    }
  }

  private static getErrorMessageKey(status?: number): string {
    switch (status) {
      case HttpStatusCode.InternalServerError:
        return ExceptionKeys.INTERNAL_SERVER_ERROR;
      case HttpStatusCode.NotFound:
        return ExceptionKeys.NOT_FOUND_ERROR;
      case HttpStatusCode.Unauthorized:
        return ExceptionKeys.UNAUTHORIZED_ERROR;
      case HttpStatusCode.Forbidden:
        return ExceptionKeys.FORBIDDEN_ERROR;
      case HttpStatusCode.BadRequest:
        return ExceptionKeys.VALIDATION_ERROR;
      default:
        return ExceptionKeys.NETWORK_ERROR;
    }
  }
}

export { NotificationService };
