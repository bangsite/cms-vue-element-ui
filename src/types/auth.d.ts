declare namespace Auth {
  type RoleType = "SHOP" | "ADMIN" | "TEST";

  type Shop = {
    id: string;
    name: string;
    email: string;
    roles?: RoleType[];
  };

  type Tokens = {
    accessToken: string;
    refreshToken: string;
  };

  type Keys = {
    key: string;
  };

  type Access = {
    shop: Shop;
    token: Tokens;
    key?: Keys;
  };
}
