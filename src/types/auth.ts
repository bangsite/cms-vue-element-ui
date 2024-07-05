type RoleType = "SHOP" | "ADMIN" | "TEST";

interface Shop {
  id: string;
  name: string;
  email: string;
  roles?: RoleType[];
}

type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Keys = {
  key: string;
};

type Login = {
  email: string;
  password: string;
};

type Register = {
  email: string;
  password: string;
};

type Access = {
  shop: Shop;
  token: Tokens;
  key?: Keys;
};
