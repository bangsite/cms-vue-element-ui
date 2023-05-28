import { computed } from "vue";

import { useAppStore } from "@/core/stores/modules/app.store";
import { useDesign } from "@/hooks/web/useDesign";

const { getPrefixCls } = useDesign();
const prefixCls = getPrefixCls("layout");
const appStore = useAppStore();

const pageLoading = computed(() => appStore.getPageLoading);

const tagsView = computed(() => appStore.getTagsView);

const collapse = computed(() => appStore.getCollapse);

const logo = computed(() => appStore.logo);

const fixedHeader = computed(() => appStore.getFixedHeader);

const mobile = computed(() => appStore.getMobile);

const fixedMenu = computed(() => appStore.getFixedMenu);

const useRenderLayout = () => {
  const renderClassic = () => {};

  const renderTopLeft = () => {};

  const renderTop = () => {};

  const renderCutMenu = () => {};

  return {
    renderClassic,
    renderTopLeft,
    renderTop,
    renderCutMenu,
  };
};

export { useRenderLayout };
