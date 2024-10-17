export const getParameterByName = (name: string) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$1");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) return null;

  if (!results[2]) return "";

  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
