import type { AnalysisTimelines, AnalysisTables } from "@/core/interfaces/analysis.interface";

export const Timelines: AnalysisTimelines[] = [
  { type: "blue", title: "Default", content: "", time: "2021-10-10 20:46" },
  { type: "green", title: "Success", content: "Where is the success", time: "2021-10-10 20:46" },
  { type: "red", title: "Error", content: "Where is the error", time: "2021-10-10 20:46" },
  { type: "yellow", title: "Warning", content: "Where is the warning", time: "2021-10-10 20:46" },

  { type: "orange", title: "Danger", content: "Where is the danger", time: "2021-10-10 20:46" },
];

export const Tables: AnalysisTables[] = [
  {
    key: 0,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: 1,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["wow"],
  },
  {
    key: 2,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
  {
    key: 3,
    name: "Soybean",
    age: 25,
    address: "China Shenzhen",
    tags: ["handsome", "programmer"],
  },
  {
    key: 4,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: 5,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["wow"],
  },
];
