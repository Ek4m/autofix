import { AuthUser } from "@/modules/auth/types/types";
import { PostProblemForm } from "./dtos";
import { ICategory } from "@/modules/categories/types";

export interface UserProblem extends PostProblemForm {
  id: number;
  thumbnail: string;
  user: AuthUser;
  status: string;
  category: ICategory;
  createdAt: string;
}
export interface MechanicOffer {
  id: number;
  description: string;
  
}
