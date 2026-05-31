import { httpClient } from "@/config/httpClient";
import { OfferForm, PostProblemForm } from "./types/dtos";
import { MechanicOffer, UserProblem } from "./types/interfaces";
import { urlFactory } from "@/helpers/urlFactory";
import { IUpload } from "../upload/types";

export const createProblemPost = async (
  body: PostProblemForm,
): Promise<UserProblem> => {
  const response = await httpClient("/issues/post", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
};

export const offerSolution = async (
  body: OfferForm,
  problemId: number,
  userId?: number,
): Promise<UserProblem> => {
  const response = await httpClient("/offer", {
    method: "POST",
    body: JSON.stringify({ ...body, userId, problemId }),
  });
  return response;
};

export const getProblemsList = async (
  filters?: Record<string, string | number | null>,
): Promise<UserProblem[]> => {
  const response: UserProblem[] = await httpClient(
    urlFactory("/issues/list", filters),
    {
      method: "GET",
    },
  );
  return response;
};

export const getProblemDetails = async (
  id: number | string,
): Promise<UserProblem> => {
  const response = await httpClient(`/issues/details/${id}`, {
    method: "GET",
  });
  return response;
};

export const getProblemEntities = async (
  id: number | string,
): Promise<{
  images: IUpload[];
  offers: MechanicOffer[];
}> => {
  const response = await httpClient(`/issues/details/${id}/entities`, {
    method: "GET",
  });
  return response;
};

export const cancelOffer = async (id: number): Promise<MechanicOffer> => {
  const response = await httpClient(`/offer/${id}/cancel`, {
    method: "DELETE",
  });
  return response;
};

export const approveOffer = async (id: number): Promise<MechanicOffer> => {
  const response = await httpClient(`/offer/${id}/approve`, {
    method: "PUT",
  });
  return response;
};

export const rateMechanic = async (body: {
  problemId: number;
  rating: number;
  comment: string;
}): Promise<MechanicOffer> => {
  const response = await httpClient(`/mechanic/rate`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
};
