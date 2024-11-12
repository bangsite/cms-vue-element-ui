<template>
  <el-dropdown placement="bottom" arrow @command="setLang">
    <span class="el-dropdown-link lang__icon">
      <SvgIcon :icon="'lucide:languages'" :size="20" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langOptions"
          :key="item.lang"
          :command="item.lang"
          :class="currentLang === item.lang ? 'active' : ''"
        >
          <div class="flex items-center gap-2 px-1">
            <SvgIcon :icon="`${item.icon}`" :size="24" />
            <span>{{ item.name }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

import { useLocale } from "@/hooks/useLocale";
import { langOptions } from "@/enums/locales.enum";
import type { LocaleType } from "@/types";

import SvgIcon from "@/components/common/SvgIcon.vue";

const router = useRouter();
const { currentLang, setI18nLanguage } = useLocale();

const setLang = async (lang: LocaleType) => {
  if (lang === currentLang.value) return;

  await setI18nLanguage(lang);

  router.go();
};
</script>
<style lang="scss">
.active {
  background-color: #ecf5ff;
  color: #409eff;
}
</style>
