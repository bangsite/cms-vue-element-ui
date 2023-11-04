import { useLoadingStore } from "@/stores/loading.store";

const onLoading = (type: string) => {
    const commonStore = useLoadingStore();
    const { startLoading, endLoading, cancelLoading } = commonStore;

    switch (type) {
        case "start": {
            startLoading();
            break;
        }
        case "end": {
            endLoading();
            break;
        }
        case "cancel": {
            cancelLoading();
            break;
        }
        default: {
            break;
        }
    }
};

export { onLoading };
