export const transformErrors = (errors: Record<string, string>) => {
  const objTmp: Record<string, string> = {};

  if (Array.isArray(errors)) {
    errors.forEach((item) => {
      objTmp[item["field"]] = item["message"];
    });
  }

  return objTmp;
};
