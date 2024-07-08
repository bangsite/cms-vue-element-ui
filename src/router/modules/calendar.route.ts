import { i18n } from "@/plugins/vue-i18n";

export const Calendar = {
  path: "/calendar",
  name: "Calendar",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.CALENDAR.TITLE"),
    icon: "ion:calendar-outline",
    hidden: false,
  },
  children: [
    {
      path: "schedule",
      name: "Schedule",
      component: () => import("@/views/calendar/CalendarView.vue"),
      meta: {
        title: i18n.global.t("ROUTER.CALENDAR.SCHEDULE"),
        icon: "ion:calendar-outline",
      },
    },
  ],
};
