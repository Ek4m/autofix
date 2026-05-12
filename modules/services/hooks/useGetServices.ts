import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../services";

export const useGetServices = ({
  search,
  category,
  mechanic,
}: {
  search?: string;
  category?: number | null;
  mechanic?: string;
}) =>
  useQuery({
    queryKey: ["getservices", search, category, mechanic],
    queryFn: async () => {
      const response = await getAllServices(search, category, mechanic);
      return response;
    },
  });
