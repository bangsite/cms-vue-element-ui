import { dashboard } from "./modules/dashboard.route";
import { Layout } from "@/shared/helpers/router.helper";
import { useI18n } from "@/hooks/web/useI18n";

const { t } = useI18n();

export const constantRouterMap: AppRouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        redirect: "/dashboard/analysis",
        name: "Root",
        meta: {
            hidden: true,
        },
    },
    {
        path: "/redirect",
        component: Layout,
        name: "Redirect",
        children: [
            {
                path: "/redirect/:path(.*)",
                name: "Redirect",
                component: () => import("@/views/Redirect/RedirectView.vue"),
                meta: {},
            },
        ],
        meta: {
            hidden: true,
            noTagsView: true,
        },
    },
    {
        path: "/login",
        component: () => import("@/views/Auth/LoginView.vue"),
        name: "Login",
        meta: {
            hidden: true,
            title: t("router.login"),
            noTagsView: true,
        },
    },
];

export const asyncRouterMap: AppRouteRecordRaw[] = [...dashboard];
