import { h } from "vue";
import { notification } from "ant-design-vue";
import type { NotificationArgsProps } from "ant-design-vue/lib/notification";
import IconNotifyError from "@/components/icons/IconNotifyError.vue";
import IconNotifySuccess from "@/components/icons/IconNotifySuccess.vue";
import IconClose from "@/components/icons/IconClose.vue";

const renderIconError = {
  icon: () =>
    h(IconNotifyError, {
      class: "notify__icon-error",
    }),
};

const renderIconSuccess = {
  icon: () =>
    h(IconNotifySuccess, {
      class: "notify__icon-success",
    }),
};

const renderIconWarning = {
  icon: () =>
    h(IconNotifyError, {
      class: "notify__icon-warning",
    }),
};

const defaultConfig: NotificationArgsProps = {
  placement: "topRight",
  message: "",
  duration: 3.5,
  closeIcon: () =>
    h(IconClose, {
      class: "notify__close",
    }),
};

const notificationInstance = (type: string, config: NotificationArgsProps) => {
  switch (type) {
    case "success":
      notification.success({ ...defaultConfig, ...config, ...renderIconSuccess });
      break;
    case "info":
      notification.info({ ...defaultConfig, ...config, ...renderIconWarning });
      break;
    case "warning":
      notification.warning({ ...defaultConfig, ...config, ...renderIconWarning });
      break;
    case "error":
      notification.error({ ...defaultConfig, ...config, ...renderIconError });
      break;
    default:
      break;
  }
};

export { notificationInstance };
