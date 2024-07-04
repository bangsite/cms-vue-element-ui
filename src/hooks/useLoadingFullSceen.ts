import { ElLoading } from "element-plus";

let loadingInstance: ReturnType<typeof ElLoading.service>;
let loadingRequestCount = 0;

const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: "Loading",
  });
};

const endLoading = () => {
  loadingInstance.close();
};

export const showFullScreenLoading = () => {
  if (loadingRequestCount === 0) startLoading();
  loadingRequestCount++;
};

export const hideFullScreenLoading = () => {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if (loadingRequestCount === 0) endLoading();
};
