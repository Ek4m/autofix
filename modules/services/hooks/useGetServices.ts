import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../services";

export const useGetServices = ({
  search,
  category,
}: {
  search: string;
  category: number | null;
}) =>
  useQuery({
    queryKey: ["getservices", search, category],
    queryFn: async () => {
      const response = await getAllServices(search, category);
      return response;
    },
  });
