<template>
  <ElDropdown :class="prefixCls" trigger="click" @command="setCurrentSize">
    <Icon :size="18" icon="mdi:format-size" :color="color" class="cursor-pointer" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in sizeMap" :key="item" :command="item">
          {{ t(`size.${item}`) }}
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "vue-i18n";

import { useAppStore } from "@/core/stores/modules/app.store";
import { useDesign } from "@/hooks/web/useDesign";
import { ElementPlusSize } from "@/types/elementPlus";
import { propTypes } from "@/shared/utils/propTypes";

import Icon from "@/components/SvgIcon.vue";

const { t } = useI18n();
const appStore = useAppStore();
const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("size-dropdown");

defineProps({
  color: propTypes.string.def(""),
});

const sizeMap = computed(() => appStore.sizeMap);

const setCurrentSize = (size: ElementPlusSize) => {
  appStore.setCurrentSize(size);
};
</script>
