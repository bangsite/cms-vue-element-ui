import useApi from "@/hooks/api/useApi";
import { deleteMedia, listMedia, uploadMedia, uploadMedias } from "@/services/modules/media.service";

export default function useMedia() {
  const { handleApiCall, isLoading, response, errors } = useApi();

  const getListImage = async () => {
    await handleApiCall(listMedia, { transformResponse: (res: any) => res?.data?.data || [] });
  };

  const uploadImage = async (data: Record<string, any>) => {
    await handleApiCall(uploadMedia, data);
  };

  const uploadImages = async (data: Record<string, any>) => {
    await handleApiCall(uploadMedias, data);
  };

  const deleteImage = async (id: string) => {
    await handleApiCall(deleteMedia, id);
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
