<template>
  <div
    class="flex items-center gap-1 overflow-x-auto relative"
    @mouseenter="showEditIcon = true"
    @mouseleave="showEditIcon = false"
  >
    <!--    <div class="cursor-move flex items-center drag-handle">-->
    <!--      <SvgIcon :icon="'ri:draggable'" :size="20" />-->
    <!--    </div>-->
    <div class="flex-1">
      <textarea
        ref="inputElement"
        v-if="isEditing"
        v-model="editedTitle"
        @blur="isEditing = false"
        @focus="isEditing = true"
        @keyup.enter="saveTask"
        @keyup.esc="cancelEditTask"
        :class="{
          'h-9 p-1.5': !isEditing,
          'bg-white border-1 border-gray-50 h-20 p-2 outline-none': isEditing,
        }"
        class="bg-transparent cursor-pointer text-sm text-gray-600 rounded-md focus:bg-white focus:shadow resize-none w-full"
      />
      <div v-else class="flex flex-1 items-center justify-between gap-2 bg-white px-2 py-1.5 mb-2 rounded-md">
        <p class="m-0 p-0.5 text-sm">{{ data.title }}</p>

        <button
          v-if="showEditIcon"
          @click="editTask"
          class="absolute bg-white hover:bg-gray-100 right-0.5 top-0.5 p-2 rounded-full"
        >
          <SvgIcon :icon="'mdi:pencil'" :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, toRef } from "vue";

import type { Tasks } from "@/types";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { showNotification } from "@/utils";

const props = defineProps({
  data: {
    type: Object as () => Tasks,
    default: () => {},
  },
});

const data = toRef(props, "data");
const inputElement = ref<HTMLTextAreaElement | null>(null);
const isEditing = ref(false);
const showEditIcon = ref(false);
const editedTitle = ref(data.value.title || "");

const editTask = () => {
  isEditing.value = true;
  nextTick(() => {
    if (inputElement.value) {
      inputElement.value.focus();
    }
  });
};

const saveTask = () => {
  if (editedTitle.value.trim() !== "") {
    data.value.title = editedTitle.value;
    showNotification("Task edited successfully!", "success", "Success");
  }
  isEditing.value = false;
  showEditIcon.value = false;
};

const cancelEditTask = () => {
  editedTitle.value = data.value?.title || "";
  isEditing.value = false;
};
</script>

<style lang="scss">
.sortable-drag {
  background-color: #e3e3e3;
  transform: rotate(5deg);
}

.sortable-ghost {
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #c7c7c9;
    border-radius: 6px;
  }
}
</style>
