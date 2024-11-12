import { ref } from "vue";
import { deleteMedia, listMedia, uploadMedia, uploadMedias } from "@/services/modules/media.service";
import type { Images } from "@/types";

export default function useMedia() {
  const isLoading = ref(false);
  const response = ref<Images>(null);
  const errors = ref(null);

  const getListImage = async () => {
    isLoading.value = true;
    try {
      const res = await listMedia();
      response.value = res?.data?.data || null;
    } catch (error: any) {
      errors.value = error.response?.data || error.message || null;
    } finally {
      isLoading.value = false;
    }
  };

  const uploadImage = async (id: string, data: Record<string, any>) => {
    isLoading.value = true;

    try {
      const res = await uploadMedia(id, data);
      response.value = res?.data?.data || null;
    } catch (error: any) {
      errors.value = error.response?.data || error.message || null;
    } finally {
      isLoading.value = false;
    }
  };

  const uploadImages = async (data: Record<string, any>) => {
    isLoading.value = true;

    try {
      const res = await uploadMedias(data);
      response.value = res?.data?.data || null;
    } catch (error: any) {
      errors.value = error.response?.data || error.message || null;
    } finally {
      isLoading.value = false;
    }
  };

  const deleteImage = async (id: string) => {
    isLoading.value = true;

    try {
      const res = await deleteMedia(id);
      response.value = res?.data?.data || null;
    } catch (error: any) {
      errors.value = error.response?.data || error.message || null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    errors,
    response,
    getListImage,
    uploadImage,
    uploadImages,
    deleteImage,
  };
}
