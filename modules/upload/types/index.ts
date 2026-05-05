import { UploadedFileType } from "@/constants/enums";

export interface IUpload {
  id: number;
  name: string;
  entityId: number;
  type: UploadedFileType;
  createdAt: string;
  updatedAt: string;
}
