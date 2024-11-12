import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Media = {
  path: "/media",
  name: "Media",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.MEDIA.TITLE"),
    icon: "fluent-mdl2:media",
    hidden: false,
  },
  children: [
    {
      path: "upload",
      name: "ImageUpload",
      component: () => import("@/views/media/ImageUpload.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.MEDIA.IMAGE_UPLOAD"),
        icon: "ic:outline-movie",
      },
    },
    {
      path: "images",
      name: "ImageList",
      component: () => import("@/views/media/ImageView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.MEDIA.IMAGE_LIST"),
        icon: "ic:outline-movie",
      },
    },
  ],
};
