import { reactive, toRefs } from "vue";

export default function useSorter() {
  const state = reactive({
    orderBy: {},
  });

  // Pagination & Page size
  const onSorterChange = async (sorter, callback) => {
    const { orderBy } = state;

    if (sorter.order === "ascend") {
      orderBy.sort = transformKey(sorter.columnKey);
    } else if (sorter.order === "descend") {
      orderBy.sort = "-" + transformKey(sorter.columnKey);
    } else {
      orderBy.sort = "";
    }

    if (typeof callback === "function") {
      await callback();
    }
  };

  const transformKey = (key) => {
    let newKey = "";

    switch (key) {
      case "publication_period":
      case "redemption_period":
        newKey = key + "_start";
        break;

      default:
        newKey = key;
    }

    return newKey;
  };

  return {
    ...toRefs(state),
    onSorterChange,
  };
}
