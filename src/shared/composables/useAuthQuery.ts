import { useQuery, type UseQueryOptions } from "vue-query";
import { profile, type ProfileResponse } from "@/core/services/modules/login.service";

export const useGetProfileQuery = (
  options?:
    | Omit<UseQueryOptions<ProfileResponse, unknown, ProfileResponse, "profile">, "queryFn" | "queryKey">
    | undefined
) => useQuery("profile", profile, options);
