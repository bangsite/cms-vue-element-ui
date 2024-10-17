// type RoleType = "SHOP" | "ADMIN" | "TEST";
type Tokens = {
  accessToken: string;
  refreshToken: string;
};

type Keys = {
  key: string;
};

export interface Role {
  roleName: string;
  permissions: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  roles: Role[];
}

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  password: string;
};

export interface AuthState {
  userInfo: User;
  layoutForm: string;
  isAuth: boolean;
}

export interface Access {
  user: User;
  tokens: Tokens;
  keys: Keys;
}
