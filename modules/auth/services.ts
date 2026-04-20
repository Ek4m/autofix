import { httpClient } from "@/config/httpClient";
import { LoginForm } from "./types/dtos";

export const loginService = async (body: LoginForm) => {
  try {
    const response = await httpClient("/api/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
