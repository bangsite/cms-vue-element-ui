import { defineStore } from "pinia";
import type { BlockFormMap, Page, Section } from "@/types";

// Define the structure of the state, which holds multiple pages
export interface BuilderLayoutState {
  pages: Page[]; // Array of pages, each with sections and blocks
}

export const useBuilderLayoutStore = defineStore("BuilderLayoutStore", {
  state: (): BuilderLayoutState => ({
    pages: [],
  }),

  getters: {},

  actions: {
    addPage(page: Page): void {
      this.pages.push(page);
    },

    removePage(pageId: string): void {
      this.pages = this.pages.filter((page) => page.id !== pageId); // Xóa một page theo ID
    },

    addSectionToPage(pageId: string, section: Section): void {
      const page = this.pages.find((p) => p.id === pageId);
      if (page) {
        page.sections.push(section);
      }
    },

    removeSectionFromPage(pageId: string, sectionIndex: number): void {
      const page = this.pages.find((p) => p.id === pageId);
      if (page && page.sections) page.sections.splice(sectionIndex, 1);
    },

    addBlockToSection(pageId: string, sectionId: string, block: BlockFormMap): void {
      const page = this.pages.find((p) => p.id === pageId);

      if (page) {
        const section = page.sections.find((s) => s.id === sectionId);
        if (section && section.blocks) section.blocks.push(block);
      }
    },

    // Remove a block from a section by index
    removeBlock(pageId: string, sectionId: string, blockIndex: number): void {
      const page = this.pages.find((p) => p.id === pageId);

      if (page) {
        const section = page.sections.find((s) => s.id === sectionId);
        if (section && section.blocks) section.blocks.splice(blockIndex, 1);
      }
    },
  },
});
