import { i18n } from "@/plugins/vue-i18n";

export const Post = {
  path: "/post",
  name: "Post",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.POST.TITLE"),
    icon: "ic:outline-article",
    hidden: false,
  },
  children: [
    {
      path: "",
      name: "ListPost",
      component: () => import("@/views/post/PostList.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.LIST"),
        icon: "mdi:list-box-outline",
      },
    },
    {
      path: "create",
      name: "CreatePost",
      component: () => import("@/views/post/CreatePost.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.CREATE"),
        icon: "ic:round-post-add",
      },
    },
    {
      path: "edit/:id",
      name: "EditPost",
      component: () => import("@/views/post/PostForm.vue"),
      meta: {
        title: i18n.global.t("ROUTER.POST.EDIT"),
        hidden: true,
      },
    },
  ],
};
