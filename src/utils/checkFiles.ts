import { getTypeData } from "@/utils/getTypeData";

export const getNameFile = (data: any) => {
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

export const getFileSize = (fileSize: string | number, limitSize: number = 5) => {
  return parseInt(<string>fileSize) / 1024 / 1024 <= limitSize;
};

export const getFileLimit = (fileList: string | any[], limitFile: number = 10) => {
  if (fileList && fileList.length) return fileList.length < limitFile;
};
