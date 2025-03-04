import { i18n } from "@/plugins/vue-i18n";

export const Product = {
  path: "/product",
  name: "Product",
  component: () => import("@/layouts/Default.vue"),
  meta: {
    title: i18n.global.t("ROUTER.PRODUCT.TITLE"),
    icon: "eos-icons:products-outlined",
    alwaysShow: true,
  },
  children: [
    {
      path: "",
      name: "ListProduct",
      component: () => import("@/views/product/ProductList.vue"),
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
      component: () => import("@/views/product/ProductCreate.vue"),
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
      component: () => import("@/views/product/ProductForm.vue"),
      meta: {
        title: i18n.global.t("ROUTER.PRODUCT.EDIT"),
        noCache: true,
        affix: true,
        hidden: true,
      },
    },
  ],
};
