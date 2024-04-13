import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";

export const Post: AppRouteRecordRaw = {
  path: "/post",
  name: "Post",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.POST.TITLE"),
    icon: "ic:outline-article",
    alwaysShow: true,
  },
  children: [
    {
      path: "",
      name: "ListPost",
      component: () => import("@/views/Post/ListPost.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.LIST"),
        icon: "mdi:list-box-outline",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "create",
      name: "CreatePost",
      component: () => import("@/views/Post/CreatePost.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.CREATE"),
        icon: "ic:round-post-add",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "edit/:id",
      name: "EditPost",
      component: () => import("@/views/Post/FormPost.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.EDIT"),
        noCache: true,
        affix: true,
        hidden: true,
      },
    },
  ],
};
