<template>
  <el-dropdown placement="bottom" arrow class="lang flex item-center" @command="setLang">
    <span class="el-dropdown-link lang__icon">
      <SvgIcon :icon="'lucide:languages'" :size="20" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in langOptions" :key="item.lang" :command="item.lang">
          {{ item.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useLocale } from "@/hooks/useLocale";
import SvgIcon from "@/components/common/SvgIcon.vue";
import type { LocaleType } from "@/types";
import { langOptions } from "@/enums/locales.enum";

const { currentLang, setI18nLanguage } = useLocale();

const setLang = (lang: LocaleType) => {
  if (lang === currentLang.value) return;

  window.location.reload();
  setI18nLanguage(lang);
};
</script>
<style lang="scss"></style>
