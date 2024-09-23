import { watch, computed } from "vue";
import { useAppStoreWithOut } from "@/stores/app.store";
import { i18n } from "@/plugins/vue-i18n";

const appStore = useAppStoreWithOut();

export const useTitle = (newTitle?: string) => {
  const title = computed(() => {
    return newTitle ? `${appStore.getTitle} - ${i18n.global.t(newTitle)}` : appStore.getTitle;
  });

  watch(
    title,
    (newVal) => {
      document.title = newVal;
    },
    { immediate: true }
  );

  return title;
};
