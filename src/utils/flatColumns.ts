import { ColumnProps } from "@/config/interfaces/table.interface";
import { setEnumMap } from "@/utils/setEnumMap";

export const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);

    // column adds default isShow && isFilterEnum property value
    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    // set enumMap
    await setEnumMap(col);
  });
  return flatArr.filter((item) => !item._children?.length);
};
