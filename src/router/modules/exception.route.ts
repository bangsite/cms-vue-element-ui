import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";
export const Exception: AppRouteRecordRaw = {
  path: "/exception",
  name: "Exception",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.EXCEPTION.TITLE"),
    icon: "ant-design:exception-outlined",
    alwaysShow: true,
  },
  children: [
    {
      path: "403",
      name: "Exception403",
      component: () => import("@/views/Exception/Error403.vue"),
      meta: {
        title: i18n.global.t("ROUTER.EXCEPTION.403"),
        icon: "ic:baseline-block",
      },
    },
    {
      path: "404",
      name: "Exception404",
      component: () => import("@/views/Exception/Error404.vue"),
      meta: {
        title: i18n.global.t("ROUTER.EXCEPTION.404"),
        icon: "ic:baseline-web-asset-off",
      },
    },
    {
      path: "500",
      name: "Exception500",
      component: () => import("@/views/Exception/Error500.vue"),
      meta: {
        title: i18n.global.t("ROUTER.EXCEPTION.500"),
        icon: "ic:baseline-wifi-off",
      },
    },
  ],
};
