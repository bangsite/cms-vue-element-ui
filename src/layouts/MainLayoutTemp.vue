<template>
  <el-config-provider :locale="localeCurrent">
    <div class="layout">
      <el-aside class="layout__side" v-model:collapsed="collapsed" :trigger="null" collapsible>
        <TheNavigation />
      </el-aside>

      <el-container>
        <el-header class="layout__header">
          <TheHeader @onMenuCollapsed="onMenuCollapsed" />
        </el-header>

        <el-main class="layout__content">
          <router-view />
        </el-main>
      </el-container>
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n";

import TheHeader from "@/layouts/TheHeader.vue";
import TheNavigation from "@/layouts/TheNavigation.vue";

import en from "element-plus/dist/locale/en.mjs";
import vi from "element-plus/dist/locale/vi.mjs";
import ja from "element-plus/dist/locale/ja.mjs";

const { locale } = useI18n();

const collapsed = ref(false);
const language = ref({ en: en, vi: vi, ja: ja });

// onMounted(() => {
//     language.value = {
//     en: { ...language.value.en, Empty: { description: "The corresponding item was not found" } },
//     ja: { ...language.value.ja, Empty: { description: "該当する企業が見つかりませんでした" } },
//   };
// });

const localeCurrent = computed(() => (locale ? language.value[locale.value] : en));

const onMenuCollapsed = ($event: boolean) => {
  collapsed.value = $event;
};

// const langGlobal = (lang: string) => (lang ? language.value[lang] : "");
</script>
