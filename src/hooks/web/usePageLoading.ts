import { useAppStoreWithOut } from "@/core/stores/modules/app.store";

const appStore = useAppStoreWithOut();

export const usePageLoading = () => {
  const loadStart = () => {
    appStore.setPageLoading(true);
  };

  const loadDone = () => {
    appStore.setPageLoading(false);
  };

  return {
    loadStart,
    loadDone,
  };
};
