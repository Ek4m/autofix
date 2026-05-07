import { httpClient } from "@/config/httpClient";
import { AuthUser } from "../auth/types/types";

export const getMechanicInfo = async (id: string): Promise<AuthUser> => {
  const response: AuthUser = await httpClient("/api/mechanic/details/" + id, {
    method: "GET",
  });
  return response;
};
