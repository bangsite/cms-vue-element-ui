type Fn<T> = (item: T, index: number, array: T[]) => boolean;

export const findIndex = <T>(ary: T[], fn: Fn<T>): number => {
  // Use Array.prototype.findIndex if available
  if (ary.findIndex) {
    return ary.findIndex(fn);
  }
  let index = -1;
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: boolean = fn(item, i, ary);
    if (ret) {
      index = i;
      return ret;
    }
  });
  return index;
};
