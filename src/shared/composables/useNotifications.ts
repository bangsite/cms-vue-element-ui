import { h } from "vue";
// import { notification } from "ant-design-vue";
import { ElNotification } from "element-plus";

// import type { NotificationArgsProps } from "ant-design-vue/lib/notification";
// import { notificationProps } from "element-plus/es/components/notification";
import IconNotifyError from "@/components/icons/IconNotifyError.vue";
import IconNotifySuccess from "@/components/icons/IconNotifySuccess.vue";
import IconClose from "@/components/icons/IconClose.vue";
import { notificationProps } from "element-plus";

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

const defaultConfig = {
  position: "top-right",
  message: "",
  duration: 3.5,
  // close: () =>
  // h(IconClose, {
  //   class: "notify__close",
  // }),
};

const notificationInstance = (type: string, config: notificationProps) => {
  switch (type) {
    case "success":
      ElNotification.success({ ...defaultConfig, ...config, ...renderIconSuccess });
      break;
    case "info":
      ElNotification.info({ ...defaultConfig, ...config, ...renderIconWarning });
      break;
    case "warning":
      ElNotification.warning({ ...defaultConfig, ...config, ...renderIconWarning });
      break;
    case "error":
      ElNotification.error({ ...defaultConfig, ...config, ...renderIconError });
      break;
    default:
      break;
  }
};

export { notificationInstance };
