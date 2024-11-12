export function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function toLowerCase(text: String) {
  return text.toLowerCase();
}

export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, "-$1").toLowerCase();
};

export const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.substring(0, maxLength) + "...";
  }
  return str;
};

export const toCamelCase = (str: string) => {
  return str
    .split(/[_\s\-]+/)
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join("");
};

export const convertKeysToCamelCase = (data: { [key: string]: any }) => {
  const newObj: { [key: string]: any } = {};

  if (!data) return newObj;

  for (const key in data) {
    // eslint-disable-next-line no-prototype-builtins
    if (data.hasOwnProperty(key)) {
      const camelCaseKey = toCamelCase(key);

      if (typeof data[key] === "object" && data[key] !== null) {
        newObj[camelCaseKey] = convertKeysToCamelCase(data[key]);
      } else {
        newObj[camelCaseKey] = data[key];
      }
    }
  }

  return newObj;
};
