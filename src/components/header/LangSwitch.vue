<template>
  <div class="bg-transparent hover:bg-gray-100 cursor-pointer flex items-center justify-center w-9 h-9 rounded-full">
    <el-dropdown placement="bottom" arrow @command="setLang">
      <span class="outline-none">
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
              <SvgIcon :icon="`${item.icon}`" :size="20" />
              <span>{{ item.name }}</span>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { useLocale } from "@/hooks/useLocale";
import type { LocaleType } from "@/types";

import SvgIcon from "@/components/common/SvgIcon.vue";
import { langOptions } from "@/constants/locales.constant";

const { currentLang, setI18nLanguage } = useLocale();

const setLang = async (lang: LocaleType) => {
  if (lang === currentLang.value) return;

  await setI18nLanguage(lang);
};
</script>
<style lang="scss">
.active {
  background-color: #ecf5ff;
  color: #409eff;
}
</style>
