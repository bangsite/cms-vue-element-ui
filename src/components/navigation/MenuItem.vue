<template>
  <el-sub-menu v-if="item.children" :index="item.name">
    <template #title>
      <el-icon size="24">
        <Icon :icon="item?.meta.icon" />
      </el-icon>
      <span class="ml-2">{{ $t(item?.meta.title) }}</span>
    </template>
    <menu-item v-for="child in item.children" :key="child.id" :item="child" />
  </el-sub-menu>
  <el-menu-item v-else :index="item.name">
    <router-link :to="{ name: item.name }">{{ $t(item.meta.title) }}</router-link>
  </el-menu-item>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
</script>
