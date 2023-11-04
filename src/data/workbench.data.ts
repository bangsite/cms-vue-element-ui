import type { Activity, Shortcuts, Technology } from "@/core/interfaces/workbench.interface";

export const WorkTech: Technology[] = [
  {
    id: 0,
    name: "Vue",
    description: "A progressive framework for building user interfaces",
    author: "You Yuxi - Evan You",
    site: "https://v3.cn.vuejs.org/",
    icon: "logos:vue",
  },
  {
    id: 1,
    name: "TypeScript",
    description: "A superset of JavaScript types that can be compiled into pure JavaScript",
    author: "Microsoft - Microsoft",
    site: "https://www.typescriptlang.org/",
    icon: "logos:typescript-icon",
  },
  {
    id: 2,
    name: "Vite",
    description: "Next generation front-end development and construction tools",
    author: "You Yuxi - Evan You",
    site: "https://vitejs.cn/",
    icon: "logos:vitejs",
  },
  {
    id: 3,
    name: "Ant Design Vue",
    description: "A Vue.js 3 UI library",
    author: "Ant Design Team",
    site: "https://antdv.com/docs/vue/introduce",
    icon: "devicon:antdesign",
  },
  {
    id: 4,
    name: "Restful API",
    description: " RESTful API using Node.js and then connecting it to a Vue.js application",
    author: "Bang.px",
    site: "",
    icon: "dashicons:rest-api",
  },
  {
    id: 5,
    name: "Pinia",
    description: "Vue state management framework, supports vue2, vue3",
    author: "Posva",
    site: "https://pinia.esm.dev/",
    icon: "noto:pineapple",
  },
];

export const WorkActivity: Activity[] = [
  {
    id: 4,
    content: "Soybean wrote some casually on the workbench page just now, and I can read it!",
    time: "2021-11-07 22:45:32",
  },
  { id: 3, content: "Soybean is busy writing project documentation for soybean-admin!", time: "2021-11-03 20:33:31" },
  {
    id: 2,
    content: "Soybean is ready to make full preparations for the release of soybean-admin 1.0!",
    time: "2021-10-31 22:43:12",
  },
  {
    id: 1,
    content: "@yanbowe submitted a bug to soybean-admin, the multi-tab bar will not be adaptive.",
    time: "2021-10-27 10:24:54",
  },
  {
    id: 0,
    content: "Soybean created the open source project soybean-admin on May 28, 2021!",
    time: "2021-05-28 22:22:22",
  },
  {
    id: 5,
    content: "Soybean created the open source project soybean-admin on May 28, 2021!",
    time: "2021-05-28 22:22:22",
  },
];

export const WorkShortcuts: Shortcuts[] = [
  { id: 0, label: "Dashboard", icon: "mdi:desktop-mac-dashboard", iconColor: "#409eff" },
  { id: 1, label: "System", icon: "ic:outline-settings", iconColor: "#7238d1" },
  { id: 2, label: "Privilege", icon: "mdi:family-tree", iconColor: "#f56c6c" },
  { id: 3, label: "Component", icon: "fluent:app-store-24-filled", iconColor: "#19a2f1" },
  { id: 4, label: "Table", icon: "mdi:table-large", iconColor: "#fab251" },
  { id: 5, label: "Chart", icon: "mdi:chart-areaspline", iconColor: "#8aca6b" },
];
