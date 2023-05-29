import ProductView from "@/views/product/ProductView.vue";
import ProductCreate from "@/views/product/ProductCreate.vue";
import ProductEdit from "@/views/product/ProductEdit.vue";

export const products = [
    {
        path: "/products",
        name: "products",
        children: [
            {
                path: "",
                name: "products-list",
                component: () => ProductView,
            },
            {
                path: "create",
                name: "products-create",
                component: () => ProductCreate,
            },
            {
                path: "edit/:productId",
                name: "products-edit",
                component: () => ProductEdit,
            },
        ],
    },
];
