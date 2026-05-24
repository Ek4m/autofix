import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../services";

export const useGetMechanicReviews = () =>
  useQuery({
    queryKey: ["getreviews"],
    queryFn: async () => {
      const response = await getReviews();
      return response;
    },
  });
