<template>
  <div ref="elRef" :class="[$attrs.class]" :style="styles"></div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { computed, onActivated, onBeforeUnmount, onMounted, ref, watch } from "vue";
import type { EChartsOption } from "echarts";

import echarts from "@/plugins/echarts";
import { debounce, isString } from "@/utils";

const props = defineProps({
  options: {
    type: Object as PropType<EChartsOption>,
    required: true,
  },
  width: {
    type: [Number, String],
    default: "",
  },
  height: {
    type: [Number, String],
    default: "500px",
  },
});

const elRef = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);
let echartRef: echarts.ECharts | null = null;

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
  if (elRef.value && props.options) {
    echartRef = echarts.init(elRef.value);
    echartRef?.setOption(props.options);
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

  contentEl.value = document.getElementsByClassName(`layout-content`)[0] as HTMLElement;
  contentEl.value?.addEventListener("transitionend", contentResizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
  contentEl.value?.removeEventListener("transitionend", contentResizeHandler);
});

onActivated(() => {
  if (echartRef) echartRef.resize();
});

watch(
  () => props.options,
  (options) => {
    if (echartRef) echartRef?.setOption(options);
  },
  {
    deep: true,
  }
);
</script>

<style scoped></style>
