import { useCache } from "@/hooks/web/useCache";

const { wsCache } = useCache();

export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    id: "",
    name: "",
    role: "user",
  };
  return wsCache.getItem("userInfo") || emptyInfo;
}
