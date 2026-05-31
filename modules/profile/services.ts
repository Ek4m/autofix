import { httpClient } from "@/config/httpClient";
import { UpdatePasswordForm } from "./types/dtos";
import { MechanicOffer, UserProblem } from "../problems/types/interfaces";
import { IService } from "../services/types/interfaces";
import { PostServiceForm } from "../services/types/dtos";
import { MechanicPanelOffer } from "./types/interfaces";
import { UserReview } from "../mechanic/types/interfaces";
import { MechanicForm } from "../auth/types/dtos";

export const logoutService = async () => {
  const response = await httpClient("/auth/logout", {
    method: "POST",
  });
  return response;
};

export const editProfileService = async (formData: FormData) => {
  const response = await httpClient("/profile/edit", {
    method: "PUT",
    body: formData,
  });
  return response;
};

export const updatePasswordService = async (body: UpdatePasswordForm) => {
  const response = await httpClient("/profile/update-password", {
    method: "PATCH",
    body: JSON.stringify(body),
  });
  return response;
};

export const getUsersProblems = async (): Promise<UserProblem[]> => {
  const response = await httpClient("/profile/problems", {
    method: "GET",
  });
  return response;
};

export const cancelProblem = async (id: string | number): Promise<true> => {
  const response = await httpClient(`/profile/problems/${id}/cancel`, {
    method: "DELETE",
  });
  return response;
};

export const completeProblem = async (id: number): Promise<true> => {
  const response = await httpClient(`/profile/problems/${id}/complete`, {
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
  rating: {
    avgRating: string;
    reviewsCount: number;
  };
  offers: MechanicOffer[];
}> => {
  const response = await httpClient(`/profile/mechanic/panel-info`, {
    method: "GET",
  });
  return response;
};

export const getMechanicsServices = async (): Promise<IService[]> => {
  const response = await httpClient(`/profile/mechanic/services`, {
    method: "GET",
  });
  return response;
};

export const deleteService = async (
  id: string | number,
): Promise<IService[]> => {
  const response = await httpClient(`/profile/mechanic/services/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const toggleServiceActivation = async (
  id: string | number,
): Promise<IService[]> => {
  const response = await httpClient(`/services/toggle-activation/${id}`, {
    method: "PATCH",
  });
  return response;
};

export const updateService = async (
  id: string | number,
  body: PostServiceForm,
): Promise<{ message: string }> => {
  const response = await httpClient(`/profile/mechanic/services/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  return response;
};

export const getOffers = async (): Promise<MechanicPanelOffer[]> => {
  const response = await httpClient(`/profile/mechanic/offers`, {
    method: "GET",
  });
  return response;
};

export const deleteOffer = async (
  id: string | number,
): Promise<{ message: string }> => {
  const response = await httpClient(`/profile/mechanic/offers/${id}`, {
    method: "DELETE",
  });
  return response;
};

export const getReviews = async (): Promise<UserReview[]> => {
  const response = await httpClient(`/profile/mechanic/ratings`, {
    method: "GET",
  });
  return response;
};

export const becomeMechanic = async (
  body: MechanicForm,
): Promise<{ message: string }> => {
  const response = await httpClient(`/profile/mechanic/become-one`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
};
