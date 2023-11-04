import CategoryIndex from "@/views/category/CategoryIndex.vue";
import CategoryCreate from "@/views/category/CategoryCreate.vue";

export const categories = [
  {
    path: "/category",
    name: "category",
    children: [
      {
        path: "",
        name: "category-list",
        component: () => CategoryIndex,
      },
      {
        path: "create",
        name: "category-create",
        component: () => CategoryCreate,
      },
      {
        path: "edit/:id",
        name: "category-edit",
        component: () => CategoryIndex,
      },
    ],
  },
];
