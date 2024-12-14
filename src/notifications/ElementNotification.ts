import { ElNotification } from "element-plus";
import { i18n } from "@/plugins/vue-i18n";
import type { INotification } from "@/types";

export class ElementNotification implements INotification {
  showError(title: string, message: string, status?: number): void {
    const titleConvert = title || i18n.global.t(`COMMON.NOTIFICATIONS.ERROR.TITLE`);
    const messageConvert = message || i18n.global.t(`EXCEPTION.${status}`);

    ElNotification({
      type: "error",
      title: titleConvert,
      message: messageConvert,
      duration: 3000,
    });
  }

  showSuccess(title = "Success", message: string, status?: number): void {
    const titleConvert = title || i18n.global.t("COMMON.NOTIFICATIONS.SUCCESS.TITLE");
    const messageConvert = message || i18n.global.t("COMMON.NOTIFICATIONS.SUCCESS.DESCRIPTION");

    ElNotification({
      type: "success",
      title: titleConvert,
      message: messageConvert,
      duration: 3000,
    });
  }
}

export const notifier: INotification = new ElementNotification();
