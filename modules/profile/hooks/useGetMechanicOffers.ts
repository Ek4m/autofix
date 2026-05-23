import { useQuery } from "@tanstack/react-query";
import { getOffers } from "../services";

export const useGetMechanicOffers = () =>
  useQuery({
    queryKey: ["getmyoffers"],
    queryFn: async () => {
      const problems = getOffers();
      return problems;
    },
  });
