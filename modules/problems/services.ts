import { httpClient } from "@/config/httpClient";
import { PostProblemForm } from "./types/dtos";
import { UserProblem } from "./types/interfaces";
import { urlFactory } from "@/helpers/urlFactory";

export const createProblemPost = async (body: PostProblemForm) => {
  const response = await httpClient("/api/issues/post", {
    method: "POST",
    body: JSON.stringify(body),
  });
  return response;
};

export const getProblemsList = async (
  filters?: Record<string, string | number>,
): Promise<UserProblem[]> => {
  const response: UserProblem[] = await httpClient(
    urlFactory("/api/issues/list", filters),
    {
      method: "GET",
    },
  );
  return response;
};
