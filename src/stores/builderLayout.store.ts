import { acceptHMRUpdate, defineStore } from "pinia";

export const useBuilderLayoutStore = defineStore("BlockStore", {
  state: () => ({
    sectionIndex: 0,
    sectionName: "",
    sectionData: [],
    blockTypes: [],
    blockTypeSelected: [],
  }),

  getters: {},

  actions: {
    setSectionIndex(position: number) {
      this.sectionIndex = +position;
    },
    setSectionName(name: string) {
      this.sectionName = name;
    },
    setBlockTypes(types: []) {
      this.blockTypes = [...types];
    },
    setBlockTypeSelected(data: []) {
      this.blockTypeSelected = data;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBuilderLayoutStore, import.meta.hot));
}
