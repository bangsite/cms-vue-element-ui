import { ElLoading } from "element-plus";
import type { LoadingOptions } from "element-plus/es/components/loading/src/types";

let loadingInstance: ReturnType<typeof ElLoading.service>;
let loadingRequestCount = 0;

export const showLoading = (options: LoadingOptions) => {
  if (loadingRequestCount === 0) {
    loadingInstance = ElLoading.service({
      ...options,
      lock: true,
      text: "Loading",
    });
  }
  loadingRequestCount++;
};

export const hideLoading = () => {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;

  if (loadingRequestCount === 0) {
    loadingInstance.close();
  }
};
