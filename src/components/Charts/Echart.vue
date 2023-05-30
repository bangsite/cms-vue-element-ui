<template>
    <div ref="elRef" :class="[$attrs.class, prefixCls]" :style="styles"></div>
</template>

<script setup lang="ts">
import { computed, ref, unref, watch, onMounted, onBeforeUnmount, onActivated } from "vue";
import type { PropType } from "vue";
import type { EChartsOption } from "echarts";
import echarts from "@/plugins/echarts";
import { useAppStore } from "@/core/stores/modules/app.store";
import { isString } from "@/shared/utils/isCheck";
import { useDesign } from "@/hooks/web/useDesign";
import { debounce } from "lodash-es";
import { propTypes } from "@/shared/utils/propTypes";

const { getPrefixCls, variables } = useDesign();

const prefixCls = getPrefixCls("echart");

const appStore = useAppStore();

const props = defineProps({
    options: {
        type: Object as PropType<EChartsOption>,
        required: true
    },
    width: propTypes.oneOfType([Number, String]).def(""),
    height: propTypes.oneOfType([Number, String]).def("500px")
});

const isDark = computed(() => appStore.getIsDark);

const theme = computed(() => {
    const echartTheme: boolean | string = unref(isDark) ? true : "auto";

    return echartTheme;
});

const options = computed(() => {
    return Object.assign(props.options, {
        darkMode: unref(theme)
    });
});

const elRef = ref<ElRef>();

let echartRef: Nullable<echarts.ECharts> = null;

const contentEl = ref<Element>();

const styles = computed(() => {
    const width = isString(props.width) ? props.width : `${props.width}px`;
    const height = isString(props.height) ? props.height : `${props.height}px`;

    return {
        width,
        height
    };
});

const initChart = () => {
    if (unref(elRef) && props.options) {
        echartRef = echarts.init(unref(elRef) as HTMLElement);
        echartRef?.setOption(unref(options));
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
    unref(contentEl) &&
    (unref(contentEl) as Element).addEventListener("transitionend", contentResizeHandler);
});

onBeforeUnmount(() => {
    window.removeEventListener("resize", resizeHandler);
    unref(contentEl) &&
    (unref(contentEl) as Element).removeEventListener("transitionend", contentResizeHandler);
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
        deep: true
    }
);
</script>

<style scoped>

</style>
