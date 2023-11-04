import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";

export const Post: AppRouteRecordRaw = {
  path: "/post",
  name: "Post",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.POST.TITLE"),
    icon: "iconoir:page-edit",
    alwaysShow: true,
  },
  children: [
    {
      path: "",
      name: "ListPost",
      component: () => import("@/views/Post/ListPost.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.LIST"),
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
