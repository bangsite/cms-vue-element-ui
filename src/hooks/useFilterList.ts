import { reactive, toRefs } from "vue";
import { dateFormat } from "@/shared/utils/helper";

export default function useFilterList() {
  const state = reactive({
    filterParams: {},
    arrDates: ["client_date", "publication_period", "redemption_period", "admin_date", "register_date"],
  });

  const processParams = (filter) => {
    const { filterParams, arrDates } = state;

    Object.keys(filter).forEach((key) => {
      if (arrDates.includes(key)) {
        handleDataRangePicker(key, filter[key]);

      } else if (filter[key] && (filter[key] !== null || typeof filter[key] !== "object")) {
        filterParams[`filter[${key}]`] = filter[key];

      } else {
        delete filterParams[`filter[${key}]`];

      }
    });
  };

  const handleDataRangePicker = (key, data) => {
    if (data && data.length > 1) {
      state.filterParams[`filter[${key}]`] = dateFormat(data[0]) + "," + dateFormat(data[1]);
    } else {
      delete state.filterParams[`filter[${key}]`];
    }
  };

  const resetParams = () => {
    state.filterParams = { page: 1 };
  };

  /**
   * Handle Reset/Submit Filter
   * @param $event
   * @param callback
   */
  const onFilterChange = async ($event, callback) => {
    state.filterParams.page = 1;
    const { type, value } = $event;
    if (type === "reset") resetParams();
    if (type === "search") processParams(value);
    if (typeof callback === "function") {
      await callback();
      delete state.filterParams.page;
    }
  };

  return {
    ...toRefs(state),
    processParams,
    resetParams,
    onFilterChange,
  };
}
