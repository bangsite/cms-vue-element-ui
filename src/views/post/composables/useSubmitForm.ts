import { ref, toRefs } from "vue";
import type { RouteParamValue } from "vue-router";

export const useSubmitForm = () => {
  const responseApi = ref({});
  const errorsApi = ref([]);
  const status = ref({});
  const onUpdate = (id: string | RouteParamValue[], value: Record<any, any>) => {
    // check clean data
    // call api
    // return status
  };

  const onCreate = (value: Record<any, any>) => {
    // check clean data
    // call api
    // return status
  };

  return {
    ...toRefs({ responseApi, errorsApi, status }),
    onCreate,
    onUpdate,
  };
};
