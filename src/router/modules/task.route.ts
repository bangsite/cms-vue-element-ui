import { i18n } from "@/plugins/vue-i18n";
import { AuthGuard } from "@/router/guard/auth.guard";

export const Task = {
  path: "/task",
  name: "Task",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.TASK.TITLE"),
    icon: "fluent:task-list-square-ltr-16-regular",
    hidden: false,
  },
  children: [
    {
      path: "list",
      name: "TaskList",
      component: () => import("@/views/task/TaskView.vue"),
      beforeEnter: [AuthGuard],
      meta: {
        title: i18n.global.t("ROUTER.TASK.LIST"),
      },
    },
  ],
};
