<template>
  <el-card class="rounded-md mb-4">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="title">Board</h3>
        <el-button type="primary" @click="handleAddBoard">+ Add New Board</el-button>
      </div>
    </template>

    <Draggable
      v-model="data"
      item-key="id"
      group="boards"
      :animation="150"
      class="flex gap-3 pb-4 overflow-x-auto mb-4"
    >
      <template #item="{ element: board }">
        <div class="board bg-gray-200 min-w-[280px] px-2 py-4 rounded-md hover:shadow-sm">
          <div class="cursor-move flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center drag-handle">
              <SvgIcon :icon="'ri:draggable'" :size="24" />
              <input
                type="text"
                v-model="board.title"
                @keyup.enter="($event.target as HTMLInputElement).blur()"
                @keydown.backspace="checkTitleBoard(board)"
                class="title bg-transparent focus:bg-white px-1 py-0.5 w-full break-words whitespace-pre-wrap h-8"
              />
            </div>

            <el-dropdown @command="handleSettingBoard">
              <el-button link>
                <SvgIcon :icon="'iconamoon:settings-thin'" :size="24"></SvgIcon>
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="{ command: 'add', ...board }">Add task </el-dropdown-item>
                  <el-dropdown-item :command="{ command: 'delete', ...board }">Delete </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <Draggable
            v-model="board.tasks"
            item-key="id"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            :animation="150"
            class="cursor-pointer task flex flex-col rounded-md min-h-4 overflow-x-auto"
          >
            <template #item="{ element: task }">
              <BoardTask :data="task" />
            </template>
          </Draggable>

          <NewTask ref="newTaskRef" @add="handleAddTask(board, $event)" />
        </div>
      </template>
    </Draggable>
  </el-card>

  <DataJsonPretty :data="data" :showLine="true" />
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import { storeToRefs } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useKeyModifier } from "@vueuse/core";

import { useBoardStore } from "@/stores/board.store";

import BoardTask from "@/views/board/BoardTask.vue";
import NewTask from "@/views/board/NewTask.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import DataJsonPretty from "@/components/common/DataJsonPretty.vue";

import type { Board, Tasks } from "@/types";
import { showNotification } from "@/utils";

const alt = useKeyModifier("Alt");
const { data, error } = storeToRefs(useBoardStore());
const { addBoard } = useBoardStore();
const newTaskRef = ref<InstanceType<typeof NewTask> | null>(null);

const checkTitleBoard = (board: Board) => {
  if (board.title === undefined || board.title.trim() === "") {
    removeBoard(board.id);
  }
};

const handleSettingBoard = (value: Board & { command: string | number }) => {
  const { command, id } = value;

  if (command && command === "add") {
    // Focus the NewTask component
    if (newTaskRef.value) newTaskRef.value.focusTextarea();
  }
  if (command && command === "delete") removeBoard(id);
};

const handleAddBoard = () => {
  const board: Board = {
    id: uuidv4(),
    title: "No Title",
    tasks: [],
  };

  addBoard(board);

  if (error.value) {
    showNotification(error.value, "error");
  } else {
    showNotification("Board added successfully!", "success");

    nextTick(() => {
      const boardElements = document.querySelectorAll(".board");
      const lastBoard = boardElements[boardElements.length - 1];

      if (lastBoard) {
        const inputElement = lastBoard.querySelector("input");
        if (inputElement) inputElement.focus();

        lastBoard.scrollIntoView({ behavior: "smooth", inline: "end", block: "nearest" });
      }
    });
  }
};

const removeBoard = (boardId: string) => {
  if (boardId) data.value = data.value.filter((item) => item.id !== boardId);
};

const handleAddTask = (board: Board, task: Tasks) => {
  if (board) board.tasks.push(task);
  showNotification("Task added successfully!", "success");
};
</script>

<style lang="scss" scoped></style>
