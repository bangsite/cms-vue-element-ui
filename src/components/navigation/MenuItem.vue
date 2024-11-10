<template>
  <el-sub-menu v-if="data.children" :index="data.name">
    <template #title>
      <el-icon size="24">
        <Icon :icon="data?.meta.icon" />
      </el-icon>
      <span class="ml-2">{{ $t(data?.meta.title) }}</span>
    </template>
    <menu-item v-for="(child, idx) in data.children" :key="idx" :data="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="data.name">
    <router-link :to="{ name: data.name }">{{ $t(data.meta.title) }}</router-link>
  </el-menu-item>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
</script>
