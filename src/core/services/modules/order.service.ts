import ApiService from "@/core/services/api.service";
import type { PaginateResponse, PaginationParams } from "@/core/types/models/Common";

export const getListOrders = async (params?: PaginationParams) => {
    const nestedParams = {
        params: {
            with: "orderDetails.product,orderDetails.variant",
            ...params,
        },
    };
    const response = await ApiService.get<PaginateResponse<any>>("/orders", nestedParams);
    return response.data;
};
