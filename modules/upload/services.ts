import { httpClient } from "@/config/httpClient";
import { EntityType } from "@/constants/enums";

export const uploadFiles = async (
  files: File[],
  fileType: EntityType,
  entityId: number,
) => {
  const formData = new FormData();
  formData.append("fileType", fileType);
  formData.append("entityId", String(entityId));
  files.forEach((file) => {
    formData.append("files", file);
  });
  const response = await httpClient("/upload", {
    method: "POST",
    body: formData,
  });
  return response;
};
