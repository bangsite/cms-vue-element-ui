<template>
  <div class="block__type">
    <div class="block__type-item" v-for="(item, idx) in blockTypes" :key="idx" @click="addBlockForm(item?.type)">
      <SvgIcon :icon="item.icon" :size="24" class="block__type-icon" />
      <span class="block__type-name">{{ $t(item?.name) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useBuilderLayoutStore } from "@/stores/builderLayout.store";
import SvgIcon from "@/components/common/SvgIcon.vue";

const emit = defineEmits(["addBlock"]);

const { blockTypes } = storeToRefs(useBuilderLayoutStore());
const addBlockForm = (type: string) => {
  emit("addBlock", type);
};
</script>
