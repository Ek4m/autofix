import { httpClient } from "@/config/httpClient";
import { PostServiceForm } from "./types/dtos";
import { IService } from "./types/interfaces";
import { urlFactory } from "@/helpers/urlFactory";

export const postService = async (
  data: PostServiceForm,
): Promise<{ message: string }> => {
  const response = await httpClient("/api/services/post", {
    body: JSON.stringify(data),
    method: "POST",
  });
  return response;
};

export const getAllServices = async (
  search?: string,
  category?: number | null,
  mechanic?: string,
): Promise<IService[]> => {
  const response = await httpClient(
    urlFactory("/api/services/list", { search, category, mechanic }),
    {
      method: "GET",
    },
  );
  return response;
};

export const getServiceDetails = async (
  id: string | number,
): Promise<IService> => {
  const response = await httpClient(`/api/services/details/${id}`, {
    method: "GET",
  });
  return response;
};
