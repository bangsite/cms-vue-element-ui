import ApiService from "../api.service";
import type { PaginateResponse } from "@/core/types/models/Common";
export interface Category {
  id: string;
  title: string;
}

export interface CategoryDetail {
  data: Category;
}

const END_POINT = "/categories";
export async function getListCategory(params = {}) {
    const resp = await ApiService.get<PaginateResponse<Category>>(END_POINT, {
        params,
    });

    return resp.data;
}

export async function createCategory(data: any) {
    const resp = await ApiService.post(END_POINT, data, {});
    return resp.data;
}

export async function getCategoryDetail(id: string) {
    const resp = await ApiService.get<CategoryDetail>(`${END_POINT}/${id}`, {});
    return resp.data;
}

export async function updateCategory(id: string, data: any) {
    const resp = await ApiService.put(`${END_POINT}/${id}`, data, {});
    return resp.data;
}
export async function deleteCategory(id: string) {
    const resp = await ApiService.delete(`${END_POINT}/${id}`, {});
    return resp.data;
}
