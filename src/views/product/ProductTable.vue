<template>
  <TableBase :columns="columns" :data-source="dataSource" />
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";

import TableBase from "@/components/tables/TableBase.vue";

const { t } = useI18n();

const columns = [
  {
    key: "index",
    label: "id",
    type: "index",
  },
  {
    field: "name",
    label: "name",
  },
  {
    field: "author",
    label: "author",
  },
  {
    field: "address",
    label: "address",
    sortable: true,
  },
];

const dataSource = [
  {
    key: "1",
    name: "Mike",
    author: "Mike",
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];
</script>
