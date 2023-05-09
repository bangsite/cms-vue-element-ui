import OrderIndex from "@/views/order/OrderIndex.vue";

export const orders = [
  {
    path: "/order",
    name: "order",
    children: [
      {
        path: "",
        name: "order-list",
        component: () => OrderIndex,
      },
    ],
  },
];
