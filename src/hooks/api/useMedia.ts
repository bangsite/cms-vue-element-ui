import { ref } from "vue";
import { deleteMedia, listMedia, uploadMedia, uploadMedias } from "@/services/modules/media.service";
import type { Images } from "@/types";

export default function useMedia() {
  const isLoading = ref(false);
  const response = ref<Images>(null);
  const errors = ref(null);

  const handleApiCall = async (apiFunc: Function, data?: number | string | [] | {}) => {
    isLoading.value = true;

    try {
      const res = await apiFunc(data);
      response.value = res?.data?.data || null;
    } catch (error: any) {
      errors.value = error.response?.data || error.message;
    } finally {
      isLoading.value = false;
    }
  };

  const getListImage = async () => {
    await handleApiCall(listMedia);
  };

  const uploadImage = async (data: Record<string, any>) => {
    await handleApiCall(uploadMedia, data);
  };

  const uploadImages = async (data: Record<string, any>) => {
    await handleApiCall(uploadMedias, data);
  };

  const deleteImage = async () => {
    await handleApiCall(deleteMedia, {});
  };

  return {
    getListImage,
    uploadImage,
    uploadImages,
    deleteImage,
    isLoading,
    errors,
    response,
  };
}
