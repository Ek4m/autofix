import { AuthUser } from "@/modules/auth/types/types";
import { PostProblemForm } from "./dtos";
import { ICategory } from "@/modules/categories/types";
import { OFFER_STATUS, PROBLEM_STATUS } from "../constants";

export interface UserProblem extends PostProblemForm {
  id: number;
  thumbnail: string;
  user: AuthUser;
  status: PROBLEM_STATUS;
  category: ICategory;
  createdAt: string;
}
export interface MechanicOffer {
  id: number;
  description: string;
  minHours: number;
  maxHours: number;
  minHoursUnit: number;
  maxHoursUnit: number;
  minPrice: number;
  maxPrice: number;
  status: OFFER_STATUS;
  createdAt: string;
  updatedAt: string;
  userId: number;
  problemId: number;
  user: AuthUser & { avgRating: string; reviewsCount: string };
}
