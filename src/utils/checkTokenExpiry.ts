export const checkTokenExpiry = (token: string) => {
  if (!token) return true;
  const payload = JSON.parse(atob(token.split(".")[1]));
  const expiry = payload.exp * 1000;
  return Date.now() > expiry;
};
