import { watch, ref } from "vue";
import { isString } from "@/utils/isCheckVal";
import { useAppStoreWithOut } from "@/stores/app.store";
import { i18n } from "@/plugins/vue-i18n";

const appStore = useAppStoreWithOut();

export const useTitle = (newTitle?: string) => {
  const title = ref(newTitle ? `${appStore.getTitle} - ${i18n.global.t(newTitle as string)}` : appStore.getTitle);

  watch(
    title,
    (n, o) => {
      if (isString(n) && n !== o && document) {
        document.title = n;
      }
    },
    { immediate: true }
  );

  return title;
};
