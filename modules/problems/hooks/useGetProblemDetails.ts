import { useQuery } from "@tanstack/react-query";
import { getProblemDetails } from "../services";

export const useGetProblemDetails = (id: number) =>
  useQuery({
    queryKey: ["getproblems", id],
    initialData: { images: [], offers: [] },
    queryFn: async () => {
      try {
        return await getProblemDetails(id);
      } catch (error) {
        console.log(error);
        return { images: [], offers: [] };
      }
    },
  });
