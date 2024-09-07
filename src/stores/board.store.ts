import { defineStore } from "pinia";
import type { Board, Tasks } from "@/types";
import { DATA_BOARD } from "@/db";
import { useSessionStorage } from "@vueuse/core";

interface BoardStore {
  data: Board[];
  loading: boolean;
  error: any;
}

// const data = computed(() => DATA_BOARD || []);
const data = useSessionStorage("board", DATA_BOARD, {
  serializer: {
    read: (value: any) => {
      return JSON.parse(value).map((board: Board) => {
        board.tasks = board.tasks.map((task: Tasks) => {
          if (task.createdAt) task.createdAt = new Date(task.createdAt);
          else task.createdAt = new Date();
          return task;
        });
        return board;
      });
    },
    write: (value: any) => JSON.stringify(value),
  },
});

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
    addBoard(board: Board) {
      if (board && Object.keys(board).length > 0) {
        this.data.push(board);
      } else {
        this.error = `Board is empty.`;
      }
    },

    addTask(boardId: string, task: Tasks) {
      const board = this.data.find((item) => item.id === boardId);

      if (board) {
        board.tasks.push(task);
      } else {
        this.error = `Board with id ${boardId} not found.`;
      }
    },

    editBoard(updatedBoard: Board) {
      const index = this.data.findIndex((item) => item.id === updatedBoard.id);
      if (index !== -1) {
        this.data[index] = { ...this.data[index], ...updatedBoard };
      } else {
        this.error = `Board with id ${updatedBoard.id} not found.`;
      }
    },

    editTask(boardId: string, updatedTask: Tasks) {
      const board = this.data.find((item) => item.id === boardId);
      if (board) {
        const index = board.tasks.findIndex((task) => task.id === updatedTask.id);

        if (index !== -1) {
          board.tasks[index] = { ...board.tasks[index], ...updatedTask };
        } else {
          this.error = `Task with id ${updatedTask.id} not found in board ${boardId}.`;
        }
      } else {
        this.error = `Board with id ${boardId} not found.`;
      }
    },

    deleteBoard(id: string | number) {
      const index = this.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.data.splice(index, 1); // Remove the board instead of marking it as deleted
      } else {
        this.error = `Board with id ${id} not found.`;
      }
    },

    deleteTask(boardId: string, taskId: string) {
      const board = this.data.find((item) => item.id === boardId);
      if (board) {
        const taskIndex = board.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          board.tasks.splice(taskIndex, 1); // Remove the task instead of marking it as deleted
        } else {
          this.error = `Task with id ${taskId} not found in board ${boardId}.`;
        }
      } else {
        this.error = `Board with id ${boardId} not found.`;
      }
    },
  },
});

export { useBoardStore };
