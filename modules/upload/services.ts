import { httpClient } from "@/config/httpClient";
import { UploadedFileType } from "@/constants/enums";
import { urlFactory } from "@/helpers/urlFactory";
import { IUpload } from "./types";

export const uploadFiles = async (
  files: File[],
  fileType: UploadedFileType,
  entityId: number,
) => {
  const formData = new FormData();
  formData.append("fileType", fileType);
  formData.append("entityId", String(entityId));
  files.forEach((file) => {
    formData.append("files", file);
  });
  const response = await httpClient("/api/upload", {
    method: "POST",
    body: formData,
  });
  return response;
};

export const getUploadedFiles = async (
  entityId: number | string,
  type: UploadedFileType,
): Promise<IUpload[]> => {
  const response = await httpClient(
    urlFactory("/api/upload/list/" + entityId, { type }),
    { method: "GET" },
  );
  return response;
};
