import { dateYMD } from "@/shared/utils/formatDateTime";
import { reactive, toRefs } from "vue";

// interface FilterParams {
//   filterParams?: Record<string | string[], T> | {};
//   keyDates?: string[] | undefined;
// }

// type Entry = Record<string, string | number>;

type FilterParams = {
  keyFilters: Record<string, string | number>;
  keyDates: string[];
};

export default function useFilterSearch() {
  const state = reactive<FilterParams>({
    keyFilters: {
      page: 1,
    },
    keyDates: ["order_date", "admin_date", "product_date"],
  });

  const processParams = (filter: { [key: string]: string }) => {
    const { keyFilters, keyDates } = state;
    Object.keys(filter).forEach((key) => {
      if (keyDates && keyDates.includes(key)) {
        handleDataRangePicker(key, filter[key]);
      } else if (filter[key] && typeof filter[key] !== "object") {
        keyFilters[`filter[${key}]`] = filter[key];
      } else {
        delete keyFilters[`filter[${key}]`];
      }
    });
  };

  const handleDataRangePicker = (key: string, data: string | any[]) => {
    const { keyFilters } = state;

    if (data && data.length > 1) {
      keyFilters[`filter[${key}]`] = dateYMD(data[0]) + "," + dateYMD(data[1]);
    } else {
      delete keyFilters[`filter[${key}]`];
    }
  };

  const resetParams = () => {
    state.keyFilters = { page: 1 };
  };

  /**
   * Handle Reset/Submit Filter
   * @param $event
   * @param callback
   */
  const onFilterChange = async ($event: { type: any; value: any }, callback: () => any) => {
    state.keyFilters.page = 1;

    const { type, value } = $event;
    if (type === "reset") resetParams();
    if (type === "search") processParams(value);
    if (typeof callback === "function") {
      await callback();
      delete state.keyFilters?.page;
    }
  };

  return {
    ...toRefs(state),
    processParams,
    resetParams,
    onFilterChange,
  };
}
