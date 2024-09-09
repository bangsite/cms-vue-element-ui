import { reactive, toRefs } from "vue";
import type { Sorter, SorterState } from "@/types";

export default function useSorter() {
  const state = reactive<SorterState>({
    orderBy: {},
  });

  /**
   * Handles sorting change, updates the orderBy state, and executes a callback function.
   * @param sorter - The sorter object containing column key and order direction.
   * @param callback - The callback function to be called after the sort state changes.
   */
  const onSorterChange = async (sorter: Sorter, callback: Function) => {
    updateSortOrder(sorter);

    if (typeof callback === "function") {
      await callback();
    }
  };

  /**
   * Updates the sort order in the state based on the provided sorter object.
   * @param sorter - The sorter object containing column key and order direction.
   */
  const updateSortOrder = (sorter: Sorter) => {
    const { orderBy } = state;

    if (sorter.order === "ascend") {
      orderBy.sort = transformKey(sorter.columnKey);
    } else if (sorter.order === "descend") {
      orderBy.sort = "-" + transformKey(sorter.columnKey);
    } else {
      orderBy.sort = "";
    }
  };

  /**
   * Transforms the column key into the corresponding database field key.
   * @param key - The column key from the sorter.
   * @returns The transformed key to be used for sorting.
   */
  const transformKey = (key: string) => {
    const customMappings: Record<string, string> = {
      publication_period: "publication_period_start",
      redemption_period: "redemption_period_start",
    };

    return customMappings[key] || key;
  };

  return {
    ...toRefs(state),
    onSorterChange,
  };
}
