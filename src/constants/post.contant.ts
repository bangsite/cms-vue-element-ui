import { v4 as uuidv4 } from "uuid";
import type { PostTreeNode } from "@/types";

export const POST_CATEGORIES: PostTreeNode = [
  {
    id: 1,
    label: "Blog",
    children: [
      {
        id: 3,
        label: "New",
      },
      {
        id: 4,
        label: "Lifestyle",
      },
    ],
  },
  {
    id: 2,
    label: "Tip",
    children: [
      {
        id: 5,
        label: "Skill",
      },
      {
        id: 6,
        label: "Code",
      },
    ],
  },
];

export const POST_TAGS = [
  { id: uuidv4(), name: "blog" },
  { id: uuidv4(), name: "news" },
  { id: uuidv4(), name: "tips" },
];

export const POST_FORM = {
  title: "",
  description: "",
  thumbnail: "",
  body: "",
  categories: [],
  tags: [],
};

export const POST_SEARCH_TAGS = [
  { id: "tips", name: "Tips" },
  { id: "tutorial", name: "Tutorial" },
  { id: "blog", name: "Blog" },
  { id: "new", name: "New" },
];

export const POST_COLUMN = [
  { prop: "title", label: "Title", width: 150, search: { el: "input", label: "title" } },
  { prop: "tags", label: "Tags", width: 150, search: { el: "select", label: "tags" } },
  { prop: "body", label: "Description", showOverflowTooltip: true },
  { prop: "date", label: "Create at", width: 100, search: { el: "date", label: "date" } },
  { prop: "author", label: "Author", width: 150, search: { el: "input", label: "author" } },
  { prop: "operations", label: "Operations", fixed: "right", width: 210 },
];
