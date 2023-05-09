import type { LoginInput, LoginResponse, UpdateProfile } from "@/core/interfaces/auth";
import ApiService from "../api.service";
import type { User } from "@/core/types/models/dashboards/Admin";

export interface ProfileResponse {
  data: User;
}
export async function login(data: LoginInput, config = {}) {
  const resp = await ApiService.post<LoginResponse>("/users/login", data, config);

  return resp.data;
}

export async function profile(config = {}) {
  const resp = await ApiService.get<ProfileResponse>("/me", config);

  return resp.data;
}

export async function updateProfile(data: Partial<UpdateProfile>, config = {}) {
  const resp = await ApiService.put("/settings", data, config);

  return resp.data;
}
