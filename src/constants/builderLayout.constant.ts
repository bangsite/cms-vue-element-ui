import { v4 as uuidv4 } from "uuid";
import type { PageTreeNode } from "@/types";

export const SECTION_DEFAULT = {
  name: "Section demo",
};

export const SECTION_FORM = {
  section_1: [],
  // section_2: [],
};
export const SECTION_FIELD = {
  section_1: "section_1",
  section_2: "section_2",
  section_3: "section_3",
  section_4: "section_4",
};
export const BLOCK_FILED_ARR = {
  b1: "block_1",
  b2: "block_2",
  b3: "block_3",
  b4: "block_4",
};

export const BLOCK_BUTTON = [
  {
    icon: "fluent:button-16-regular",
    type: "button",
    name: "BLOCK.BLOCK_BUTTON",
  },
];

export const BLOCK_IMAGE = [
  {
    icon: "basil:image-outline",
    type: "image",
    name: "BLOCK.BLOCK_IMAGE",
  },
];

export const BLOCK_HTML = [
  {
    icon: "arcticons:photo-editor",
    type: "html",
    name: "BLOCK.BLOCK_HTML",
  },
];

export const BLOCK_TYPES = new Map([["default", [...BLOCK_BUTTON, ...BLOCK_IMAGE, ...BLOCK_HTML]]]);

export const BLOCK_FORM_COMMON = {
  id: "",
  class: "",
  background_color: "",
};

export const BLOCK_FORM_BUTTON = {
  label: "",
  button_color: "",
  url: "",
};

export const BLOCK_FORM_IMAGE = {
  url: "",
  alt: "",
  image_id: "",
};

export const BLOCK_FORM_HTML = {
  html: "",
};

export const BLOCK_FORM = new Map([
  ["button", { ...BLOCK_FORM_COMMON, ...BLOCK_FORM_BUTTON }],
  ["image", { ...BLOCK_FORM_COMMON, ...BLOCK_FORM_IMAGE }],
  ["html", { ...BLOCK_FORM_COMMON, ...BLOCK_FORM_HTML }],
  ["default", { ...BLOCK_FORM_COMMON }],
]);

export const BUILDER_CATEGORIES: PageTreeNode[] = [
  {
    id: 1,
    label: "Event",
    children: [
      {
        id: 3,
        label: "Computer",
      },
      {
        id: 4,
        label: "Smartphone",
      },
    ],
  },
  {
    id: 2,
    label: "Black Friday",
    children: [
      {
        id: 5,
        label: "T-shirt",
      },
      {
        id: 6,
        label: "Hat",
      },
    ],
  },
];

export const BUILDER_TAGS = [
  { id: uuidv4(), name: "page" },
  { id: uuidv4(), name: "dynamic" },
  { id: uuidv4(), name: "css" },
  { id: uuidv4(), name: "js" },
  { id: uuidv4(), name: "banner" },
];
