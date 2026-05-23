import { useQuery } from "@tanstack/react-query";
import { getProblemDetails } from "../services";

export const useGetProblemDetails = (id: number | string) =>
  useQuery({
    queryKey: ["getproblems", id],
    queryFn: async () => {
      try {
        return await getProblemDetails(id);
      } catch (error) {
        console.log(error);
      }
    },
  });
