import { Layout } from "@/shared/helpers/router.helper";
import { useI18n } from "@/hooks/web/useI18n";

const { t } = useI18n();
export const dashboard: AppRouteRecordRaw[] = [
    {
        path: "/dashboard",
        component: Layout,
        redirect: "/dashboard/analysis",
        name: "Dashboard",
        meta: {
            title: t("router.dashboard"),
            icon: "ant-design:dashboard-filled",
            alwaysShow: true,
        },
        children: [
            {
                path: "analysis",
                component: () => import("@/views/Dashboard/AnalysisView.vue"),
                name: "Analysis",
                meta: {
                    title: t("router.analysis"),
                    noCache: true,
                    affix: true,
                },
            },
            {
                path: "workplace",
                component: () => import("@/views/Dashboard/WorkplaceView.vue"),
                name: "Workplace",
                meta: {
                    title: t("router.workplace"),
                    noCache: true,
                },
            },
        ],
    },
];
