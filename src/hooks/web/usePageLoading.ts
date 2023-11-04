import { useAppStoreWithOut } from "@/stores/app.store";

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
