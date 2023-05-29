import { computed, unref } from "vue";
import { useAppStore } from "@/core/stores/modules/app.store";

const appStore = useAppStore();
const layout = computed(() => appStore.getLayout);

const useRenderLayout = () => {
    switch (unref(layout)) {
    case "classic":
        return "renderClassic";
    case "topLeft":
        return "renderTopLeft";

    case "top":
        return "renderTop";
    case "cutMenu":
        return "renderCutMenu";
    default:
        break;
    }
};

export { useRenderLayout };
