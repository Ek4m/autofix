import { AuthUser } from "@/modules/auth/types/types";

export interface IService {
  id: number;
  serviceName: string;
  description: string;
  priceMin: number;
  isActive: boolean;
  priceMax: number;
  isVip: true;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: AuthUser;
}
