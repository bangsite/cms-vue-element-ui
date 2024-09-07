import { defineStore } from "pinia";
import type { BlockType } from "@/types";

export const useBlockLibraryStore = defineStore("BuilderBlockStore", {
  state: () => ({
    blockTypes: [] as BlockType[],
  }),

  actions: {
    setBlockTypes(types: BlockType[]) {
      this.blockTypes = types;
    },
  },
});
