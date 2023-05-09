export const formatJsonToUrlParams = (data: { [x: string]: string | number | boolean }) => {
  return typeof data === "object"
    ? Object.keys(data)
        .map((key) => {
          return `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
        })
        .join("&")
    : "";
};
