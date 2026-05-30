"use server";
import { httpClient } from "@/config/httpClient";
import { IService } from "./types/interfaces";

export const getServiceDetailsAction = async (
  id: string | number,
): Promise<IService> => {
  const response = await httpClient(
    `http://localhost:3000/api/services/details/${id}`,
    {
      method: "GET",
    },
  );
  return response;
};
