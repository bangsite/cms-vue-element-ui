<template>
  <a-sub-menu key="sub1" v-if="menuSub">
    <template #title>
      <div class="flex flex-align-center">
        <SvgIcon :icon="menuSub?.meta.icon" :size="20" class="mr-5" />
        <span>{{ $t(menuSub?.meta.title) }}</span>
      </div>
    </template>
    <a-menu-item v-for="(childOne, index) in menuSub" :key="index">
      <router-link :to="fullPath(menuSub, childOne?.path)">
        {{ $t(childOne?.meta.title) }}
      </router-link>
    </a-menu-item>
  </a-sub-menu>
</template>
<script setup lang="ts">
import { fullPath } from "@/helpers/menu.helper";
import SvgIcon from "@/components/common/SvgIcon.vue";
import { array } from "vue-types";

defineProps({
  menuSub: {
    type: array,
    default: [],
  },
});
</script>
