import { httpClient } from "@/config/httpClient";
import { LoginForm, RegisterForm } from "./types/dtos";

export const loginService = async (body: LoginForm) => {
  try {
    const response = await httpClient("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerService = async (body: RegisterForm) => {
  const response = await httpClient("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
};

export const getUserInfoService = async () => {
  const response = await httpClient("/api/auth/info", {
    method: "GET",
  });
  return response;
};
