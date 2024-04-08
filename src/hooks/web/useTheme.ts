import { isDark } from "@/utils/isCheckVal";
import { useCache } from "@/hooks/web/useCache";
import { useAppStore } from "@/stores/modules/app.store";

const appStore = useAppStore();
const { wsCache } = useCache();
const useDefaultTheme = () => {
  const isDarkData = wsCache.getItem("isDark");
  const isDarkTheme = isDark();

  if (isDarkData !== null) {
    appStore.setIsDark(isDarkData as boolean);
    return;
  }

  appStore.setIsDark(isDarkTheme);
};

export { useDefaultTheme };
