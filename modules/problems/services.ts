import { httpClient } from "@/config/httpClient";
import { OfferForm, PostProblemForm } from "./types/dtos";
import { MechanicOffer, UserProblem } from "./types/interfaces";
import { urlFactory } from "@/helpers/urlFactory";
import { IUpload } from "../upload/types";

export const createProblemPost = async (
  body: PostProblemForm,
): Promise<UserProblem> => {
  const response = await httpClient("/api/issues/post", {
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
  const response = await httpClient("/api/offer", {
    method: "POST",
    body: JSON.stringify({ ...body, userId, problemId }),
  });
  return response;
};

export const getProblemsList = async (
  filters?: Record<string, string | number | null>,
): Promise<UserProblem[]> => {
  const response: UserProblem[] = await httpClient(
    urlFactory("/api/issues/list", filters),
    {
      method: "GET",
    },
  );
  return response;
};

export const getProblemDetails = async (
  id: number | string,
): Promise<{ images: IUpload[]; offers: MechanicOffer[], problem:UserProblem }> => {
  const response = await httpClient("/api/issues/details/" + id, {
    method: "GET",
  });
  return response;
};

export const cancelOffer = async (id: number): Promise<MechanicOffer> => {
  const response = await httpClient(`/api/offer/${id}/cancel`, {
    method: "DELETE",
  });
  return response;
};

export const approveOffer = async (id: number): Promise<MechanicOffer> => {
  const response = await httpClient(`/api/offer/${id}/approve`, {
    method: "PUT",
  });
  return response;
};
