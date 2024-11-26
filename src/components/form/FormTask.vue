<template>
  <el-card class="border-none bg-transparent !shadow-none">
    <template #header v-if="title">
      <h4 class="title">{{ title }}</h4>
    </template>

    <el-form ref="formRef" :model="data" :label-position="labelPosition">
      <div class="grid grid-cols-1 gap-4 align-middle mb-2">
        <template v-for="item in columns" :key="item.prop">
          <InputBase
            v-if="item.type === 'input'"
            :label="item.label"
            :name="item.prop"
            :rules="'max:50'"
            :placeholder="`Enter ${item.prop}`"
          />
          <TextAreaBase
            v-else-if="item.type === 'textarea'"
            :label="item.label"
            :name="item.prop"
            :rows="5"
            :rules="'max:100'"
            :placeholder="`Enter ${item.prop}`"
          />
          <SelectBase
            v-else-if="item.type === 'select'"
            :label="item.label"
            :name="item.prop"
            :options="selectData"
            :placeholder="`Enter ${item.prop}`"
          />
        </template>
      </div>
      <el-divider border-style="dashed" />

      <div class="flex justify-end">
        <el-button @click="onCancel"> Cancel </el-button>
        <el-button type="primary" @click="onSubmitTask">
          {{ edit ? "Update Data" : "Add New" }}
        </el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import { useForm } from "vee-validate";
import { toRef } from "vue";
import { useTaskStore } from "@/stores/task.store";
import type { TaskFormProps } from "@/types";

import InputBase from "@/components/form/InputBase.vue";
import SelectBase from "@/components/form/SelectBase.vue";
import TextAreaBase from "@/components/form/TextAreaBase.vue";

const props = withDefaults(defineProps<TaskFormProps>(), {
  labelPosition: "top",
});
const emit = defineEmits(["submit", "cancel"]);

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

const onCancel = () => {
  emit("cancel", true);
};
</script>
