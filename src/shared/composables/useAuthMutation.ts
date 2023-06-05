import { useMutation, type UseMutationOptions } from "vue-query";
import type { UpdateProfile } from "@/core/interfaces/auth.interface";
import { updateProfile } from "@/core/services/modules/login.service";

export const useUpdateProfileMutation = (
  options?: Omit<UseMutationOptions<any, unknown, Partial<UpdateProfile>, unknown>, "mutationFn"> | undefined
) => useMutation((data: Partial<UpdateProfile>) => updateProfile(data), options);
