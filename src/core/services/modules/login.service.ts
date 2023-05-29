import type { LoginInput, LoginResponse, UpdateProfile } from "@/core/interfaces/auth";
import ApiService from "../api.service";

export interface ProfileResponse {
  // data: User;
}

export async function login(data: LoginInput, config = {}) {
    const resp = await ApiService.post<LoginResponse>("/users/login", data, config);

    return resp.data;
}

export async function logoutApi(config = {}): Promise<Response> {
    const resp = await ApiService.get("/users/logout", config);

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
