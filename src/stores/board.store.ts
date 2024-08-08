import { defineStore } from "pinia";
import { computed } from "vue";
import type { Board, Tasks } from "@/types";
import { DATA_BOARD } from "@/db";

interface BoardStore {
  data: Board[];
  loading: boolean;
  error: any;
}
const data = computed(() => DATA_BOARD || []);

const useBoardStore = defineStore("BoardStore", {
  state: (): BoardStore => ({
    data: data.value,
    loading: false,
    error: null,
  }),
  getters: {
    getBoardList: (state) => state.data,
  },
  actions: {
    addBoard(data: Board) {
      if (data) this.data.push(data);
    },

    addTask(data: Tasks) {
      if (data) {
        this.data.tasks.push(data);
      }
    },

    editBoard(updatedTask: Board) {
      const index = this.data.findIndex((item) => item.id === updatedTask.id);
      if (index !== -1) {
        this.data[index] = { ...this.data[index], ...updatedTask };
      }
    },

    editTask(updatedTask: Tasks) {
      const index = this.data.findIndex((item) => item.id === updatedTask.id);
      if (index !== -1) {
        this.data[index] = { ...this.data[index], ...updatedTask };
      }
    },

    deleteBoard(id: string | number) {
      const index = this.data.findIndex((item) => item.id === id);
      if (index !== -1) this.data[index].deleted = true;
    },

    deleteTask(id: string | number) {
      const index = this.data.findIndex((item) => item.id === id);
      if (index !== -1) this.data[index].deleted = true;
    },
  },
});

export { useBoardStore };
