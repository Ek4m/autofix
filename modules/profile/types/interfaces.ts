import {
  MechanicOffer,
  UserProblem,
} from "@/modules/problems/types/interfaces";

export interface MechanicPanelOffer extends MechanicOffer {
  problem: UserProblem;
}
