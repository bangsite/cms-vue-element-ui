import ImageSimulator from "@/views/image-simulator/ImageSimulator.vue";

export const simulator = [
  {
    path: "/image-simulator",
    name: "image-simulator",
    children: [
      {
        path: "design",
        name: "image-simulator-design",
        component: () => ImageSimulator,
      },
    ],
  },
];
