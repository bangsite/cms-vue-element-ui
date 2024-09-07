import { acceptHMRUpdate, defineStore } from "pinia";
import type { ExtraBlockForm, Section } from "@/types";

// Define the structure for the dialog store state
export interface DialogState {
  title: string;
  layoutName: string;
  data: ExtraBlockForm | Record<string, any>; // Assuming Block type is present
  active: boolean;
  activeFooter: boolean;
  rerender: boolean;
  width: string;
}

export const useDialogStore = defineStore("DialogStore", {
  state: (): DialogState => ({
    title: "",
    layoutName: "",
    data: {},
    active: false,
    activeFooter: false,
    rerender: false,
    width: "",
  }),

  getters: {
    getData: (state): ExtraBlockForm | Record<string, any> => state.data,
  },

  actions: {
    setActive(active: boolean) {
      this.active = active;
    },
    setActiveFooter(activeFooter: boolean) {
      this.activeFooter = activeFooter;
    },
    setReRender(rerender: boolean) {
      this.rerender = rerender;
    },
    setLayoutName(name: string) {
      this.layoutName = name;
    },
    setTitle(title: string) {
      this.title = title;
    },
    setDataRender(data: ExtraBlockForm | Record<string, any>): void {
      this.data = data;
    },
  },
});

if (import.meta?.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDialogStore, import.meta.hot));
}
