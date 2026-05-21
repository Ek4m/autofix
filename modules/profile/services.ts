import { httpClient } from "@/config/httpClient";
import { UpdatePasswordForm } from "./types/dtos";
import { MechanicOffer, UserProblem } from "../problems/types/interfaces";
import { IService } from "../services/types/interfaces";

export const logoutService = async () => {
  const response = await httpClient("/api/auth/logout", {
    method: "POST",
  });
  return response;
};

export const editProfileService = async (formData: FormData) => {
  const response = await httpClient("/api/profile/edit", {
    method: "PUT",
    body: formData,
  });
  return response;
};

export const updatePasswordService = async (body: UpdatePasswordForm) => {
  const response = await httpClient("/api/profile/update-password", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return response;
};

export const getUsersProblems = async (): Promise<UserProblem[]> => {
  const response = await httpClient("/api/profile/problems", {
    method: "GET",
  });
  return response;
};

export const cancelProblem = async (id: string | number): Promise<true> => {
  const response = await httpClient(`/api/profile/problems/${id}/cancel`, {
    method: "DELETE",
  });
  return response;
};

export const completeProblem = async (id: number): Promise<true> => {
  const response = await httpClient(`/api/profile/problems/${id}/complete`, {
    method: "PUT",
  });
  return response;
};

export const getMechanicPanelInfo = async (): Promise<{
  offerCounts: {
    allOffersCount: number;
    acceptedOfferCount: number;
  };
  servicesCount: number;
  services: IService[];
  offers: MechanicOffer[];
}> => {
  const response = await httpClient(`/api/profile/mechanic/panel-info`, {
    method: "GET",
  });
  return response;
};

export const getMechanicsServices = async (): Promise<IService[]> => {
  const response = await httpClient(`/api/profile/mechanic/services`, {
    method: "GET",
  });
  return response;
};
