<template>
  <el-card class="rounded-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="title">Board</h3>
        <el-button type="primary" @click="addNewBoard">Add New Board</el-button>
      </div>
    </template>

    <Draggable
      v-model="data"
      item-key="id"
      group="boards"
      :animation="150"
      class="flex gap-3 pb-4 mb-4 overflow-x-auto cursor-move"
    >
      <template #item="{ element: board }">
        <div class="bg-gray-200 min-w-[250px] px-2 py-4 rounded-lg hover:shadow-sm">
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center drag-handle">
              <SvgIcon :icon="'ri:draggable'" :size="24" />
              <h4 class="title">{{ board.title }}</h4>
            </div>

            <el-button link>
              <SvgIcon :icon="'iconamoon:settings-thin'" :size="24"></SvgIcon>
            </el-button>
          </div>

          <Draggable
            v-model="board.tasks"
            item-key="id"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            :animation="150"
            handle=".drag-handle"
            class="task flex flex-col rounded-lg min-h-4 overflow-x-auto cursor-move"
          >
            <template #item="{ element: task }">
              <BoardTask :data="task" />
            </template>
          </Draggable>

          <p @click="addNewTask" class="text-gray-500 text-base cursor-pointer hover:text-gray-600">+ Add new task</p>
        </div>
      </template>
    </Draggable>

    <div class="border border-solid border-gray-300 flex max-h-96 rounded-lg overflow-y-auto p-4">
      <vue-json-pretty :data="data" />
      <!--      <pre>-->
      <!--        {{ JSON.stringify(data, null, 1) }}-->
      <!--      </pre>-->
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useBoardStore } from "@/stores/board.store";
import { storeToRefs } from "pinia";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

import BoardTask from "@/views/board/BoardTask.vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { useKeyModifier } from "@vueuse/core";

const { data } = storeToRefs(useBoardStore());
const alt = useKeyModifier("Alt");

const addNewBoard = () => {};
const addNewTask = () => {};
</script>

<style lang="scss" scoped></style>
