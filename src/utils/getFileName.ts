import { getTypeData } from "./getTypeData";

export const getFileName = (data: any) => {
  const type = getTypeData(data);
  let fileName = "";

  switch (type) {
    case "file":
      fileName = data?.name;
      break;
    case "string":
      fileName = data.split("/").pop().split("#")[0].split("?")[0];
      break;
  }
  return fileName;
};
