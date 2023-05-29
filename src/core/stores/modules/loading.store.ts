import { defineStore } from "pinia";

interface State {
  loadingCount: number;
  loading: boolean;
}

export const useLoadingStore = defineStore("loading", {
    state: (): State => {
        return {
            loadingCount: 0,
            loading: false,
        };
    },

    actions: {
        startLoading() {
            this.loadingCount += 1;
            this.loading = true;
        },
        endLoading() {
            this.loadingCount -= 1;
        },
        cancelLoading() {
            this.loadingCount = 0;
            this.loading = false;
        },
    },
});
