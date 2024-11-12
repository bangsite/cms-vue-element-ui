<template>
  <div>
    <textarea
      ref="taskInput"
      v-model="title"
      @keydown.tab="createTask"
      @keydown.enter="createTask"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="!focused ? '+ Add a card' : 'Enter a title for this card'"
      :class="{
        'h-9 p-1.5': !focused,
        'bg-white border-2 border-black h-20 p-2': focused,
      }"
      class="bg-transparent cursor-pointer text-sm text-gray-600 rounded-md focus:bg-white focus:shadow resize-none w-full"
    >
    </textarea>
  </div>
</template>

<script setup lang="ts">
import type { Tasks } from "@/types";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

const emit = defineEmits<{ (e: "add", payload: Tasks): void }>();

const focused = ref(false);
const title = ref("");
const taskInput = ref<HTMLTextAreaElement | null>(null);

const createTask = (e: Event) => {
  if (title.value.trim()) {
    e.preventDefault();
    emit("add", {
      id: uuidv4(),
      title: title.value.trim(),
      createdAt: new Date().toISOString(),
    });
  }

  title.value = "";
};

const focusTextarea = () => {
  if (taskInput.value) {
    taskInput.value.focus();
  }
};

// Export focusTextarea method
defineExpose({ focusTextarea });
</script>

<style scoped>
textarea::placeholder {
  /* Modern browsers */
  color: #444;
}

textarea:-moz-placeholder, /* Firefox 18- */
textarea::-moz-placeholder, /* Firefox 19+ */
textarea:-ms-input-placeholder, /* IE 10+ */
textarea::-webkit-input-placeholder /* Webkit based */ {
  color: #444;
}
</style>
