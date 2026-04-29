import { httpClient } from "@/config/httpClient";
import { PostProblemForm } from "./types/dtos";

export const createProblemPost = async (body: PostProblemForm) => {
  const response = await httpClient("/api/issues/post", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
};
