import { httpClient } from "@/config/httpClient";
import { AuthUser } from "../auth/types/types";
import { MechanicListItem } from "./types/interfaces";

export const getMechanicInfo = async (
  id: string,
): Promise<
  AuthUser & { rating: { avgRating: string; reviewsCount: string } }
> => {
  const response = await httpClient("/mechanic/details/" + id, {
    method: "GET",
  });
  return response;
};

export const getMechanicContactInfo = async (
  id: string | number,
): Promise<{
  phoneNumber: string;
  rawAddress: string;
  locationUrl: string;
}> => {
  const response = await httpClient("/mechanic/contact-info/" + id, {
    method: "GET",
  });
  return response;
};

export const getMechanicList = async (): Promise<MechanicListItem[]> => {
  const response = await httpClient("/mechanic", {
    method: "GET",
  });
  return response;
};
