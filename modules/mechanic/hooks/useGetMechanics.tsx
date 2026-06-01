import { useQuery } from "@tanstack/react-query";
import { getMechanicList } from "../services";

export const useGetMechanics = () =>
  useQuery({
    queryKey: ["mechanics"],
    queryFn: async () => {
      const response = await getMechanicList();
      return response;
    },
  });
