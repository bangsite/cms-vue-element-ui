<template>
  <div class="flex flex-col gap-4 py-2" v-if="data && data.length > 0">
    <div
      v-for="item in data"
      :key="item.id"
      class="flex items-center gap-4 justify-between p-2 cursor-pointer hover:shadow-[0px_5px_10px_#8d8e9120;] rounded-md"
    >
      <!--drag-->
      <div class="flex items-center gap-2">
        <el-checkbox
          :checked="item.completed"
          :value="item.completed"
          label=""
          size="large"
          @change="handleCompleted(item.id)"
        />
      </div>

      <div class="flex-auto">
        <span>{{ item.title }}</span>
      </div>

      <div class="flex items-center justify-center">
        <el-button type="primary" @click="handleEdit(item.id)">
          <SvgIcon :icon="'circum:edit'" :size="24" />
        </el-button>
        <el-button type="danger" @click="handleDelete(item.id)">
          <SvgIcon :icon="'material-symbols-light:delete-outline'" :size="24" />
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import SvgIcon from "@/components/common/SvgIcon.vue";
import type { Tasks } from "@/types";

defineProps({
  data: { type: Array as PropType<Tasks[]>, default: () => [] },
});

const emits = defineEmits(["edit", "completed", "delete"]);

const handleCompleted = (id: string | number) => {
  emits("completed", id);
};

const handleEdit = (id: string | number) => {
  emits("edit", id);
};

const handleDelete = (id: string | number) => {
  emits("delete", id);
};
</script>

<style scoped></style>
