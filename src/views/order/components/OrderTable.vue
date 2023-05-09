<template>
  <div>
    <TableBase :items="items" :fields="fields" />
  </div>
</template>

<script lang="ts" setup>
import TableBase from "@/components/tables/TableBase.vue";
import { ref } from "vue";

const props = defineProps({
  dataSource: {
    type: Array,
    default: () => [],
  },
  isFetching: {
    type: Boolean,
    default: false,
  },
});

const items = ref([
  { id: 1, title: "First entry", description: "Lorem ipsum" },
  { id: 1, title: "Second entry", description: "Sit dolar" },
]);

const fields = ref([
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
]);
</script>

<style scoped></style>
