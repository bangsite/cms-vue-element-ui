<template>
  <div :class="prefixCls">
    <Icon
      :size="18"
      :icon="collapse ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'"
      :color="color"
      class="cursor-pointer"
      @click="toggleCollapse"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, unref } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";
import { propTypes } from "@/shared/utils/propTypes";
import { useDesign } from "@/hooks/web/useDesign";

import Icon from "@/components/SvgIcon.vue";

const appStore = useAppStore();
const { getPrefixCls } = useDesign();

const prefixCls = getPrefixCls("collapse");

defineProps({ color: propTypes.string.def("") });

const collapse = computed(() => appStore.getCollapse);

const toggleCollapse = () => {
  const collapsed = unref(collapse);
  appStore.setCollapse(!collapsed);
};
</script>
