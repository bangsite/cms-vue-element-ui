<template>
  <el-dropdown placement="bottom" arrow class="lang flex item-center" @command="setLang">
    <span class="el-dropdown-link lang__icon">
      <SvgIcon :icon="'lucide:languages'" :size="20" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in langMap" :key="item.lang" :command="item.lang">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { computed } from "vue";

import { useLocaleStore } from "@/stores/locale.store";
import { useLocale } from "@/hooks/useLocale";
import SvgIcon from "@/components/common/SvgIcon.vue";
import type { LocaleType } from "@/types";

const localeStore = useLocaleStore();
const { changeLocale } = useLocale();

const langMap = computed(() => localeStore.getLocaleMap);
const currentLang = computed(() => localeStore.getCurrentLocale);

const setLang = (lang: LocaleType) => {
  if (lang === currentLang.value.lang) return;
  window.location.reload();
  localeStore.setCurrentLocale(lang);
  changeLocale(lang);
};
</script>
<style lang="scss"></style>
