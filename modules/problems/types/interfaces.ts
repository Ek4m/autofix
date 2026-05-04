import { AuthUser } from "@/modules/auth/types/types";
import { PostProblemForm } from "./dtos";
import { ICategory } from "@/modules/categories/types";

export interface UserProblem extends PostProblemForm {
  id: number;
  user: AuthUser;
  category: ICategory;
  createdAt: string;
}
