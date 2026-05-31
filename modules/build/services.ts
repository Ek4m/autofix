import { httpClient } from "@/config/httpClient";

export const getAllCategories = async () => {
  const response = await httpClient("/build/categories", {
    method: "GET",
  });
  return response;
};

export const getBrandsAndModels = async () => {
  const response = await httpClient("/build/brands-and-models", {
    method: "GET",
  });
  return response;
};
