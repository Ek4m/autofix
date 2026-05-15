import { httpClient } from "@/config/httpClient";
import { UpdatePasswordForm } from "./types/dtos";

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
