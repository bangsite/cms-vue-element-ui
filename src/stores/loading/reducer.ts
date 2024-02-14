export const showFullScreenLoading = (fullscreen: boolean) => {
  if (loadingRequestCount === 0) startLoading(fullscreen);
  loadingRequestCount++;
};

export const hideFullScreenLoading = () => {
  if (loadingRequestCount <= 0) return;
  loadingRequestCount--;
  if (loadingRequestCount === 0) endLoading();
};
