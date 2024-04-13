import { Layout } from "@/helpers/router.helper";
import { i18n } from "@/plugins/i18n";

export const Product: AppRouteRecordRaw = {
  path: "/product",
  name: "Product",
  component: Layout,
  meta: {
    title: i18n.global.t("ROUTER.PRODUCT.TITLE"),
    icon: "icon-park-outline:ad-product",
    alwaysShow: true,
  },
  children: [
    {
      path: "",
      name: "ListProduct",
      component: () => import("@/views/Product/ListProduct.vue"),
      meta: {
        title: i18n.global.t("ROUTER.PRODUCT.LIST"),
        icon: "fluent-mdl2:product-list",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "create",
      name: "CreateProduct",
      component: () => import("@/views/Product/CreateProduct.vue"),
      meta: {
        title: i18n.global.t("ROUTER.PRODUCT.CREATE"),
        icon: "fluent-mdl2:product-release",
        noCache: true,
        affix: true,
      },
    },
    {
      path: "edit/:id",
      name: "EditProduct",
      component: () => import("@/views/Product/FormProduct.vue"),
      meta: {
        title: i18n.global.t("ROUTER.PRODUCT.EDIT"),
        noCache: true,
        affix: true,
        hidden: true,
      },
    },
  ],
};
