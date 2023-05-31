<template>
  <div ref="elRef" :class="[$attrs.class, prefixCls]" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed, onActivated, onBeforeUnmount, onMounted, ref, unref, watch } from "vue";
import type { PropType } from "vue";
import type { EChartsOption } from "echarts";
import { debounce } from "lodash-es";

import echarts from "@/plugins/echarts";
import { useAppStore } from "@/core/stores/modules/app.store";
import { useDesign } from "@/hooks/web/useDesign";
import { propTypes } from "@/shared/utils/propTypes";
import { isString } from "@/shared/utils/isCheck";

const appStore = useAppStore();
const { getPrefixCls, variables } = useDesign();

const prefixCls = getPrefixCls("echart");

const props = defineProps({
  options: {
    type: Object as PropType<EChartsOption>,
    required: true,
  },
  width: propTypes.oneOfType([Number, String]).def(""),
  height: propTypes.oneOfType([Number, String]).def("500px"),
});

const isDark = computed(() => appStore.getIsDark);

const theme = computed(() => {
  return isDark.value ? true : "auto";
});

const options = computed(() => {
  const { options } = props;

  return Object.assign(options, {
    darkMode: theme.value,
  });
});

const elRef = ref<ElRef>();

let echartRef: Nullable<echarts.ECharts> = null;

const contentEl = ref<Element>();

const styles = computed(() => {
  const { width, height } = props;
  const widthOut = isString(width) ? width : `${width}px`;
  const heightOut = isString(height) ? height : `${height}px`;

  return {
    width: widthOut,
    height: heightOut,
  };
});

const initChart = () => {
  const { options } = props;

  if (elRef.value && options) {
    echartRef = echarts.init(elRef.value as HTMLElement);
    echartRef?.setOption(options);
  }
};

const resizeHandler = debounce(() => {
  if (echartRef) {
    echartRef.resize();
  }
}, 100);

const contentResizeHandler = async (e: TransitionEvent) => {
  if (e.propertyName === "width") {
    resizeHandler();
  }
};
onMounted(() => {
  initChart();

  window.addEventListener("resize", resizeHandler);

  contentEl.value = document.getElementsByClassName(`${variables.namespace}-layout-content`)[0];
  contentEl.value && (contentEl.value as Element).addEventListener("transitionend", contentResizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  unref(contentEl) && (unref(contentEl) as Element).removeEventListener("transitionend", contentResizeHandler);
});

onActivated(() => {
  if (echartRef) {
    echartRef.resize();
  }
});

watch(
  () => options.value,
  (options) => {
    if (echartRef) {
      echartRef?.setOption(options);
    }
  },
  {
    deep: true,
  }
);
</script>

<style scoped></style>
