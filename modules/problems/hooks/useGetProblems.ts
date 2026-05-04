import { useQuery } from "@tanstack/react-query";
import { getProblemsList } from "../services";
import { ORDER_BY_CREATION } from "../constants";

export const useGetProblems = (filter?: {
  category?: number;
  vip?: number;
  search?: string;
  order: ORDER_BY_CREATION;
}) =>
  useQuery({
    queryKey: ["getproblems", filter],
    queryFn: async () => {
      return await getProblemsList(filter);
    },
  });
