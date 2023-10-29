<template>
  <ExceptionBase type="403" @error-click="errorClick" />
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePermissionStore } from "@/stores/permission.store";

import ExceptionBase from "@/components/common/ExceptionBase.vue";

const { push } = useRouter();

const permissionStore = usePermissionStore();
console.log(permissionStore.addRouters[0]?.path);
const errorClick = () => {
  push(permissionStore.addRouters[0]?.path as string);
};
</script>
