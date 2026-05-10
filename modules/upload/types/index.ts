import { EntityType } from "@/constants/enums";

export interface IUpload {
  id: number;
  name: string;
  entityId: number;
  type: EntityType;
  createdAt: string;
  updatedAt: string;
}
