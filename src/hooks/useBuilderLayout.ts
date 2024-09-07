import { ref } from "vue";
import type { Page, Section } from "@/types";
import { generateId } from "@/utils";

export const useBuilderLayout = () => {
  const initPage = (): Page => ({
    id: generateId(),
    name: "Layout",
    layoutSettings: {
      layoutType: "flex",
    },
    sections: [],
  });

  const initSection = (): Section => ({
    id: generateId(),
    name: "New Section",
    blocks: [],
  });

  return {
    initPage,
    initSection,
  };
};
