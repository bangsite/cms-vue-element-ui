export interface AuthState {
  token: string;
  loginLoading: boolean;
}

export interface AdminUserInfo {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  status: number;
  roles: string[] | string;
}

export interface AdminUserState {
  token: string | null;
  name: string;
  profiles?: AdminUserInfo | object;
}

export interface LoginInput {
  email: string;
  password: string;
  remember?: boolean;
}

export interface ResLogin {
  tokens: Record<string, any>;
  shop: Record<string, any>;
}

export interface UpdateProfile {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
