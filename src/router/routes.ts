import type { RouteRecordRaw } from "vue-router";

// import { ResolveGuard } from "@/core/guard/resolve.guard";
// import { LoginGuard } from "@/core/guard/login.guard";
// import { AuthGuard } from "@/core/guard/auth.guard";

import { dashboard } from "./modules/dashboard.route";
// import { products } from "./modules/product.route";
// import { categories } from "./modules/category.route";
// import { orders } from "./modules/order.route";
// import { simulator } from "./modules/simulator.route";
import { setting } from "./modules/setting.route";

export const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    // beforeEnter: ResolveGuard([LoginGuard]),
    component: () => import("@/views/auth/LoginView.vue"),
  },

  {
    path: "/",
    redirect: () => {
      return { name: "dashboard" };
    },
    // beforeEnter: ResolveGuard([AuthGuard]),
    component: () => import("@/layouts/MainLayout.vue"),
    children: [...dashboard, ...setting],
  },
];
