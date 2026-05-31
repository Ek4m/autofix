"use server";

import { httpClient } from "@/config/httpClient";
import { MechanicOffer, UserProblem } from "./types/interfaces";
import { IUpload } from "../upload/types";

export const getProblemDetailsAction = async (
  id: number | string,
): Promise<UserProblem> => {
  const response = await httpClient(`/issues/${id}`, {
    method: "GET",
  });
  return response;
};

export const getProblemEntitiesActions = async (
  id: number | string,
): Promise<{ images: IUpload[]; offers: MechanicOffer[] }> => {
  const response = await httpClient(`/issues/${id}/entities`, {
    method: "GET",
  });
  return response;
};
