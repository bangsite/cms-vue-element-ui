<template>
  <el-card class="rounded-lg">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="title">Todo List</h3>
        <el-button type="primary" @click="addNewTask">Add New Task</el-button>
      </div>
    </template>

    <TaskList :data="dataTaskList" @completed="completedTask" @delete="deleteTask" @edit="handleEditTask" />
  </el-card>

  <component
    :is="ModalView"
    v-if="isModalActive"
    :modalActive="isModalActive"
    :classHead="'custom-head'"
    :disable-footer="true"
    @close-modal="isModalActive = !isModalActive"
  >
    <template #header>{{ isEdit ? "Edit Task" : "Add task" }}</template>
    <template #body>
      <component :is="FormTask" :data="dataForm" :columns="taskCol" :edit="isEdit" @submit="handleSubmit" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { v4 as uuidv4 } from "uuid";

import { lazyLoadComponent } from "@/helpers";
import { useTaskStore } from "@/stores/task.store";

import TaskList from "@/views/task/TaskList.vue";

const isModalActive = ref(false);
const isEdit = ref(false);

let ModalView = ref();
let FormTask = ref();
let dataForm = reactive({});
const taskCol = reactive([
  { prop: "title", label: "Title", type: "input" },
  { prop: "description", label: "Description", type: "input" },
]);

const { data } = storeToRefs(useTaskStore());
const { completedTask, deleteTask } = useTaskStore();
const dataTaskList = computed(() => data.value.filter((item) => !item.deleted));

onBeforeMount(() => {
  dataForm = createInitForm();
});

const createInitForm = () => ({
  id: uuidv4(),
  title: "",
  description: "",
  completed: false,
  deleted: false,
});

const loadModalView = () => {
  ModalView.value = lazyLoadComponent("modal/ModalView");
};

const loadFormTask = () => {
  FormTask.value = lazyLoadComponent("form/FormTask");
};

const addNewTask = () => {
  isModalActive.value = true;
  isEdit.value = false;
  dataForm = { ...createInitForm() };

  loadModalView();
  loadFormTask();
};

const handleEditTask = (id: string) => {
  isModalActive.value = true;
  isEdit.value = true;
  dataForm = { ...data.value.filter((item) => item.id === id)[0] };

  loadModalView();
  loadFormTask();
};

const handleSubmit = (event: boolean | string) => {
  if (event) {
    isModalActive.value = !isModalActive.value;
    dataForm = { ...createInitForm() };
  }
};
</script>

<style scoped></style>
