import { defineStore } from "pinia";
import { computed } from "vue";
import { DATA_TASK } from "@/db";
import type { Tasks } from "@/types";

interface TaskStore {
  data: Tasks[];
  loading: boolean;
  error: any;
}

const data = computed(() => DATA_TASK || []);

const useTaskStore = defineStore("TaskStore", {
  state: (): TaskStore => ({
    data: data.value,
    loading: false,
    error: null,
  }),
  getters: {
    getTaskList: (state) => state.data,
  },
  actions: {
    addTask(data: Tasks) {
      if (data) this.data.push(data);
    },

    editTask(updatedTask: Tasks) {
      const index = this.data.findIndex((item) => item.id === updatedTask.id);
      if (index !== -1) {
        this.data[index] = { ...this.data[index], ...updatedTask };
      }
    },

    completedTask(taskId: Omit<Tasks, "id">) {
      const data = this.data.find((item) => item.id === taskId);

      if (data) data.completed = !data.completed;
    },

    deleteTask(id: string | number) {
      const index = this.data.findIndex((item) => item.id === id);
      if (index !== -1) this.data[index].deleted = true;
    },
  },
});

export { useTaskStore };
