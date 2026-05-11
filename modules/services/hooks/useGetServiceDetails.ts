import { useQuery } from "@tanstack/react-query";
import { getServiceDetails } from "../services";

export const useGetServiceDetails = (id: number | string) =>
  useQuery({
    queryKey: ["getserviceDetails", id],
    queryFn: async () => {
      const response = await getServiceDetails(id);
      return response;
    },
  });
