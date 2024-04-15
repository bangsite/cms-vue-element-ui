import { ColumnProps } from "@/interfaces/table.interface";

export const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
  if (!enumValue) return;

  // If the same value exists in the current enumMap return
  // if (enumMap.value.has(prop!) && (typeof enumValue === "function" || enumMap.value.get(prop!) === enumValue)) return;
  //
  // // The current enum is static data and is stored directly in enumMap.
  // if (typeof enumValue !== "function") return enumMap.value.set(prop!, unref(enumValue!));
  //
  // // In order to prevent slow execution of the interface and slow storage, resulting in repeated requests, it is stored as [] in advance, and then stored again after the interface returns.
  // enumMap.value.set(prop!, []);
  //
  // // The current enum is background data and needs to request data, then call the request interface and store it in enumMap
  // const { data } = await enumValue();
  // enumMap.value.set(prop!, data);
};
