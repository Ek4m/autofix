import { httpClient } from "@/config/httpClient";

export const logoutService = async () => {
  const response = await httpClient("/api/auth/logout", {
    method: "POST",
  });
  return response;
};
