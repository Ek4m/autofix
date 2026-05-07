import { useQuery } from "@tanstack/react-query";
import { getMechanicInfo } from "../services";

export const useGetMechanicInfo = (id: string) =>
  useQuery({
    queryKey: ["getmechanicinfo", id],
    queryFn: async () => {
      const response = await getMechanicInfo(id);
      return response;
    },
  });
