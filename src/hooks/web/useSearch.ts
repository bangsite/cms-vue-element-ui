import { Table } from "./interface";
import { reactive, toRefs } from "vue";

export const useSearch = () => {
  const state = reactive({
    searchParam: {},
    searchInitParam: {},
    totalParam: {},
  });

  const updatedSearchParam = () => {
    state.totalParam = {};
    const nowSearchParam: Table.StateProps["searchParam"] = {};
    for (const key in state.searchParam) {
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
  };

  const onSearch = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  };

  const onReset = () => {
    state.pageable.pageNum = 1;
    state.searchParam = { ...state.searchInitParam };
    updatedTotalParam();
    getTableList();
  };

  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  return {
    ...toRefs(state),
    onSearch,
    onReset,
    handleSizeChange,
    handleCurrentChange,
    updatedSearchParam,
  };
};
