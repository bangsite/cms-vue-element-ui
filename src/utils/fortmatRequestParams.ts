export function fortmatRequestParams({
  pagination = {},
  sortField = "",
  sortOrder = "",
  filters = {},
  extraParams = {},
}) {
  return {
    ...pagination,
    sortField,
    sortOrder,
    ...filters,
    ...extraParams,
  };
}
