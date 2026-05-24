import { AuthUser } from "@/modules/auth/types/types";
import { UserProblem } from "@/modules/problems/types/interfaces";

export interface UserReview {
  comment: string;
  createdAt: string;
  id: number;
  mechanicId: number;
  offerAgreementId: number;
  problemId: number;
  rating: number;
  updatedAt: string;
  userId: number;
  reviewer: AuthUser;
  problem: UserProblem;
}
