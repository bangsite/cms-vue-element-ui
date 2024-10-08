<template>
  <el-card class="rounded-md">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="title">Todo List</h3>
        <el-button type="primary" @click="openAddTaskModal">Add New Task</el-button>
      </div>
    </template>

    <TaskList :data="filteredTaskList" @completed="completedTask" @delete="deleteTask" @edit="handleEditTask" />
  </el-card>

  <component
    :is="modalComponent"
    v-if="isModalVisible"
    :modalActive="isModalVisible"
    :classHead="'custom-head'"
    :disable-footer="true"
    @close-modal="toggleModalVisibility"
  >
    <template #header>{{ isEditing ? "Edit Task" : "Add Task" }}</template>
    <template #body>
      <component
        :is="formComponent"
        :data="formData"
        :columns="taskColumns"
        :edit="isEditing"
        @submit="handleFormSubmit"
      />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { v4 as uuidv4 } from "uuid";

import { useTaskStore } from "@/stores/task.store";

import TaskList from "@/views/task/TaskList.vue";

const modalComponent = ref(defineAsyncComponent(() => import("@/components/modal/ModalView.vue")));
const formComponent = ref(defineAsyncComponent(() => import("@/components/form/FormTask.vue")));

const isModalVisible = ref(false);
const isEditing = ref(false);
let formData = reactive({});
const taskColumns = reactive([
  { prop: "title", label: "Title", type: "input" },
  { prop: "description", label: "Description", type: "input" },
]);

const { data } = storeToRefs(useTaskStore());
const { completedTask, deleteTask } = useTaskStore();

const filteredTaskList = computed(() => data.value.filter((item) => !item.deleted));

const createInitialForm = () => ({
  id: uuidv4(),
  title: "",
  description: "",
  completed: false,
  deleted: false,
});

const toggleModalVisibility = () => {
  isModalVisible.value = !isModalVisible.value;
};
const openAddTaskModal = () => {
  isModalVisible.value = true;
  isEditing.value = false;
  formData = { ...createInitialForm() };
};
const handleEditTask = (id: string) => {
  isModalVisible.value = true;
  isEditing.value = true;
  formData = { ...data.value.filter((item) => item.id === id)[0] };
};
const handleFormSubmit = (event: boolean) => {
  if (event) {
    toggleModalVisibility();
    formData = { ...createInitialForm() };
  }
};
</script>

<style scoped></style>
