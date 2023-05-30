<template>
  <ConfigGlobal :size="currentSize">
    <RouterView :class="greyMode ? `${prefixCls}-grey-mode` : ''" />
  </ConfigGlobal>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { RouterView } from "vue-router";

import { useAppStore } from "@/core/stores/modules/app.store";
import { useDesign } from "@/hooks/web/useDesign";
import { useCache } from "@/hooks/web/useCache";
import { isDark } from "@/shared/utils/isCheck";

import ConfigGlobal from "@/components/ConfigGlobal/Index.vue";

const appStore = useAppStore();
const { wsCache } = useCache();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("app");
const currentSize = computed(() => appStore.getCurrentSize);
const greyMode = computed(() => appStore.getGreyMode);

console.log(greyMode.value);
console.log(prefixCls);
const useDefaultTheme = () => {
    const isDarkData = wsCache.getItem("isDark");
    const isDarkTheme = isDark();

    if (isDarkData !== null) {
        appStore.setIsDark(isDarkData as boolean);
        return;
    }

    appStore.setIsDark(isDarkTheme);
};

useDefaultTheme();
</script>

<style lang="scss">
$prefix-cls: "app";

.#{$prefix-cls}-grey-mode {
  filter: grayscale(100%);
}
</style>
