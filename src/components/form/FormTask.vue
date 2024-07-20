<template>
  <el-card class="mb-4 border-none bg-transparent !shadow-none">
    <template #header v-if="title">
      <h4 class="title">{{ title }}</h4>
    </template>

    <el-form ref="formRef" :model="data" :label-position="labelPosition">
      <div class="grid grid-cols-1 gap-4 align-middle mb-2">
        <template v-for="item in columns" :key="item.prop">
          <InputBase v-if="item.type === 'input'" :label="`${item.label}`" placeholder="Input text" :name="item.prop" />
          <SelectBase
            v-else-if="item.type === 'select'"
            :label="`${item.label}`"
            :name="item.prop"
            :options="selectData"
          />
        </template>
      </div>
      <div class="flex justify-end">
        <el-button type="primary" @click="onSubmitTask">{{ edit ? "Update Data" : "Add New" }}</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toRef } from "vue";

import InputBase from "@/components/form/InputBase.vue";
import SelectBase from "@/components/form/SelectBase.vue";

import { useTaskStore } from "@/stores/task.store";

interface ProTableProps {
  labelPosition?: string;
  title?: string;
  columns?: any[];
  data?: { [key: string]: any };
  selectData?: any[];
  edit?: boolean;
}

const props = withDefaults(defineProps<ProTableProps>(), {
  labelPosition: "top",
  searchColumns: () => [],
});
const emit = defineEmits(["submit"]);

const data = toRef(props, "data");
const edit = toRef(props, "edit");
const { handleSubmit } = useForm({
  initialValues: { ...data.value },
});
const { addTask, editTask } = useTaskStore();

const onSubmitTask = handleSubmit(async (values, { resetForm }) => {
  if (edit.value) {
    if (values) editTask(values);
  } else {
    if (values) addTask(values);
  }

  emit("submit", true);
  resetForm();
});
</script>
