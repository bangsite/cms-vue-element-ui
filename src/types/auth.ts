type RoleType = "SHOP" | "ADMIN" | "TEST";

export interface Shop {
  id: string;
  name: string;
  email: string;
  roles?: RoleType[];
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Keys = {
  key: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  password: string;
};

export type Access = {
  shop: Shop;
  tokens: Tokens;
  key?: Keys;
};
