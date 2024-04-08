import { computed, reactive, toRefs } from "vue";

export interface Pageable {
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface StateProps {
  tableData: any[];
  pageable: Pageable;
  searchParam: {
    [key: string]: any;
  };
  searchInitParam: {
    [key: string]: any;
  };
  totalParam: {
    [key: string]: any;
  };
  icon?: {
    [key: string]: any;
  };
}

/**
 *
 * @param {Function} api
 * @param {Object} initParam
 * @param {Boolean} isPageable
 * @param {Function} dataCallBack
 * @param {Function} requestError
 */
export const useTables = (
  api?: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallBack?: (data: any) => any,
  requestError?: (error: any) => void
) => {
  const state = reactive<StateProps>({
    tableData: [],
    pageable: {
      pageNum: 1,
      pageSize: 1,
      total: 0,
    },
    searchParam: {},
    searchInitParam: {},
    totalParam: {},
  });

  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize,
      };
    },
    set: (newVal: any) => {
      console.log("Value after paging update", newVal);
    },
  });

  /**
   * @description Get table data
   * @return void
   * */
  const getTableList = async () => {
    if (!api) return;

    try {
      // First put the initialization parameters and paging parameters into the total parameters
      Object.assign(state.totalParam, initParam, isPageable ? pageParam.value : {});
      const res = await api({ ...state.searchInitParam, ...state.totalParam });
      let data = res?.data;

      dataCallBack && (data = dataCallBack(data?.data));
      state.tableData = isPageable ? data.list : data;
      // Deconstruct the paging data returned by the background (if there is paging, update the paging information)
      if (isPageable) {
        const { pageNum, pageSize, total } = data;
        updatePageable({ pageNum, pageSize, total });
      }
    } catch (error) {
      requestError && requestError(error);
    }
  };

  /**
   * @description Update query parameters
   * @return void
   * */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // Process query parameters. You can add custom prefixes to query parameters.
    const nowSearchParam: StateProps["searchParam"] = {};
    // Prevent manual clearing of the input box to carry parameters (you can customize the query parameter prefix here)
    for (const key in state.searchParam) {
      // In some cases, the parameter is false/0 and should also carry parameters
      if (state.searchParam[key] || state.searchParam[key] === false || state.searchParam[key] === 0) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }

    Object.assign(state.totalParam, nowSearchParam, isPageable ? pageParam.value : {});
  };

  /**
   * @description Update pagination info
   * @param {Object} pageable paging data returned by the background
   * @return void
   * */
  const updatePageable = (pageable: Pageable) => {
    Object.assign(state.pageable, pageable);
  };

  /**
   * @description Table data query
   * @return void
   * */
  const search = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description Table data reset
   * @return void
   */
  const resetTableList = () => {
    state.pageable.pageNum = 1;
    // When resetting the search form, if there are default search parameters, reset the default search parameters.
    state.searchParam = { ...state.searchInitParam };
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description Number of items per page changes
   * @param {Number} val Current number of items
   * @return void
   * */
  const handleSizeChange = (val: number) => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;

    getTableList();
  };

  /**
   * @description Current page changes
   * @param {Number} val current page
   * @return void
   * */
  const handleCurrentChange = (val: number) => {
    state.pageable.pageNum = val;

    getTableList();
  };

  return {
    ...toRefs(state),
    search,
    getTableList,
    resetTableList,
    handleSizeChange,
    handleCurrentChange,
    updatedTotalParam,
  };
};
