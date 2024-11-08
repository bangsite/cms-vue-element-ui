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
