<template>
  <div class="block__type">
    <div
      class="block__type-item"
      v-for="(block, index) in blockTypes"
      :key="index"
      @click="handleAddBlockForm(block.type)"
    >
      <button type="button" class="block__type-desc">
        {{ $t(block.name) }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBlockStore } from "@/stores/block.store";

const emit = defineEmits(["addBlock"]);

const { blockTypes } = storeToRefs(useBlockStore());
const handleAddBlockForm = (type) => {
  emit("addBlock", type);
};
</script>
