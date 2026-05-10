import { httpClient } from "@/config/httpClient";
import { PostServiceForm } from "./types/dtos";

export const postService = async (data: PostServiceForm) => {
  const response = await httpClient("/api/services/post", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return response;
};
