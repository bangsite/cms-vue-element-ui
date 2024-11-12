import { getTypeData } from "@/utils/getTypeData";

export const checkNameFile = (data: any) => {
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

export const checkFileSize = (fileSize: string | number, limitSize: number = 5) => {
  return parseInt(<string>fileSize) / 1024 / 1024 <= limitSize;
};

export const checkFileLimit = (fileList: string | any[], limitFile: number = 10) => {
  if (fileList && fileList.length) return fileList.length < limitFile;
};

export function formatFileSize(attachmentSize) {
  const DEFAULT_SIZE = 0;
  const fileSize = attachmentSize ?? DEFAULT_SIZE;

  if (!fileSize) {
    return `${DEFAULT_SIZE} kb`;
  }

  const sizeInKb = fileSize / 1024;

  if (sizeInKb > 1024) {
    return `${(sizeInKb / 1024).toFixed(2)} mb`;
  } else {
    return `${sizeInKb.toFixed(2)} kb`;
  }
}

export function truncateImageFile(filename, limit) {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".svg"];
  const extension = validExtensions.find((ext) => filename.endsWith(ext));

  if (!extension) {
    return filename;
  }

  const baseName = filename.slice(0, -extension.length);
  return baseName.length > limit ? `${baseName.slice(0, limit)}...${extension}` : filename;
}
