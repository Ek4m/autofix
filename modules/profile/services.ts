import { httpClient } from "@/config/httpClient";

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
