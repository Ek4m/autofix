import { httpClient } from "@/config/httpClient";
import { UpdatePasswordForm } from "./types/dtos";
import { UserProblem } from "../problems/types/interfaces";

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

export const getUsersProblems = async (): Promise<UserProblem[]> => {
  const response = await httpClient("/api/profile/problems", {
    method: "GET",
  });
  return response;
};

export const cancelProblem = async (id: string | number): Promise<true> => {
  const response = await httpClient(`/api/profile/problems/${id}/cancel`, {
    method: "DELETE",
  });
  return response;
};
