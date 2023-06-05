declare namespace Auth {
  type RoleType = "super" | "admin" | "user";

  interface UserInfo {
    id: string;
    name: string;
    role: RoleType;
  }
}
