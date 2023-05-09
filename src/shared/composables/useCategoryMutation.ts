import { useMutation } from "vue-query";
import { createCategory, deleteCategory, updateCategory } from "@/core/services/modules/category.service";
import { message } from "ant-design-vue";
import type { ComputedRef } from "vue";

export const useCreateCategoryMutation = () => {
  return useMutation(createCategory, {
    onSuccess: (data) => {
      message.success("Create category successfully");
    },
  });
};
export const useUpdateCategoryMutation = (id: ComputedRef<string>) => {
  return useMutation((data: any) => updateCategory(id.value, data), {
    onSuccess: (data) => {
      message.success("Update category successfully");
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation((id: string) => deleteCategory(id), {
    onSuccess: (data) => {
      message.success("Delete category successfully");
    },
  });
};
