import { useQuery } from "@tanstack/react-query";
import { getProblemsList } from "../services";

export const useGetProblems = (filter?: { category?: number }) =>
  useQuery({
    queryKey: ["getproblems", filter],
    queryFn: async () => {
      return await getProblemsList(filter);
    },
  });
