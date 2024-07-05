import { defineStore } from "pinia";
import type { Block, BlockFormMap, BuilderState, Section } from "@/types/BuilderLayout";

// interface Section {
//   sectionIndex: number;
//   sectionName: string;
//   sectionData: SectionForm[];
//   blocks: BlockFormMap[];
//   blockTypeSelected: [];
// }
//
// interface BuilderState {
//   sections: Section[];
// }

export const useBuilderLayoutStore = defineStore("BuilderLayoutStore", {
  state: (): BuilderState => ({
    sections: [],
    blockTypes: [],
  }),

  getters: {},

  actions: {
    // Add a new section
    addSection(section: Section): void {
      this.sections.push(section);
    },

    // Remove a section by index
    removeSection(index: number): void {
      this.sections.splice(index, 1);
    },

    // Add a block to a section
    addBlock(sectionIndex: number, blockForm: BlockFormMap): void {
      if (this.sections[sectionIndex]) {
        if (!this.sections[sectionIndex]?.blocks) {
          this.sections[sectionIndex]["blocks"] = [];
        }

        this.sections[sectionIndex]?.blocks.push(blockForm);
      }
    },

    // Remove a block from a section by index
    removeBlock(sectionIndex: number, blockIndex: number): void {
      if (this.sections[sectionIndex] && this.sections[sectionIndex]?.blocks[blockIndex]) {
        this.sections[sectionIndex].blocks.splice(blockIndex, 1);
      }
    },

    // Set block types for dynamic block selection
    setBlockTypes(blockTypes: Block[]): void {
      this.blockTypes = blockTypes;
    },

    // setSectionIndex(position: number) {
    //   this.sections.sec = position;
    // },
    // setSectionName(name: string) {
    //   this.sectionName = name;
    // },
    // setBlockTypes(types: Block[]) {
    //   this.blockTypes.push({ ...types });
    // },
    // setBlockTypeSelected(data: []) {
    //   this.blockTypeSelected = data;
    // },
  },
});

// Hot Module Replacement (HMR) handling
// Hot Module Replacement (HMR): The HMR code is not needed if you are not using Hot Module Replacement. If you are not using HMR, you can remove that part of the code.
// if (import.meta.hot) {
//   import.meta.hot.accept(acceptHMRUpdate(useBuilderLayoutStore, import.meta.hot));
// }
