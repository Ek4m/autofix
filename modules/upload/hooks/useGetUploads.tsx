import { UploadedFileType } from "@/constants/enums";
import { useQuery } from "@tanstack/react-query";
import { getUploadedFiles } from "../services";

export const useGetUploadedImages = (
  entityId: number | string,
  type: UploadedFileType,
) => {
  return useQuery({
    queryKey: ["getuploads", entityId, type],
    queryFn: async () => {
      try {
        const response = await getUploadedFiles(entityId, type);
        return response;
      } catch (error) {
        return [];
      }
    },
    initialData: [],
  });
};
