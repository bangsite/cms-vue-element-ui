import { reactive, toRefs } from "vue";
import { dateTime } from "@/utils";
import type { FilterParams, UseFilterListState } from "@/types";

export default function useFilterList() {
  const state = reactive<UseFilterListState>({
    filterParams: {},
    dateFields: [],
  });

  const processParams = (filter: FilterParams) => {
    const { filterParams, dateFields } = state;

    Object.keys(filter).forEach((key) => {
      const value = filter[key];

      if (dateFields.includes(key)) {
        handleDateRange(key, value);
      } else if (isValidFilterValue(value)) {
        filterParams[`filter[${key}]`] = value;
      } else {
        delete filterParams[`filter[${key}]`];
      }
    });
  };

  /**
   * Checks if a value is valid to be used as a filter.
   * A valid value is not null or an object.
   * @param value - The value to check.
   * @returns True if the value is valid; otherwise, false.
   */
  const isValidFilterValue = (value: any) => {
    return value !== null && typeof value !== "object";
  };

  /**
   * Handles the date range for date fields and formats them.
   * @param key - The field key.
   * @param dateRange - The date range value as an array.
   */
  const handleDateRange = (key: string, dateRange: any[]) => {
    const { filterParams } = state;

    if (Array.isArray(dateRange) && dateRange.length === 2) {
      filterParams[`filter[${key}]`] = `${dateTime(dateRange[0])},${dateTime(dateRange[1])}`;
    } else {
      delete filterParams[`filter[${key}]`];
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
  const onChangeFilter = async ($event: { type: string; value: FilterParams }, callback: Function) => {
    state.filterParams.page = 1;

    const { type, value } = $event;

    if (type === "reset") resetParams();
    else if (type === "search") processParams(value);

    if (typeof callback === "function") {
      await callback();
    }

    delete state.filterParams.page;
  };

  /**
   * Adds a new date field to the filter list.
   * @param fieldName - The name of the date field to add.
   */
  const addDateField = (fieldName: string) => {
    if (!state.dateFields.includes(fieldName)) state.dateFields.push(fieldName);
  };

  /**
   * Removes a date field from the filter list.
   * @param fieldName - The name of the date field to remove.
   */
  const removeDateField = (fieldName: string) => {
    const index = state.dateFields.indexOf(fieldName);
    if (index > -1) {
      state.dateFields.splice(index, 1);
    }
  };

  return {
    ...toRefs(state),
    processParams,
    resetParams,
    onChangeFilter,
    addDateField,
    removeDateField,
  };
}
