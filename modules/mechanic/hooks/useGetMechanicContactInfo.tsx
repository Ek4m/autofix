import { useQuery } from "@tanstack/react-query";
import { getMechanicContactInfo } from "../services";

export const useGetMechanicContactInfo = (id: number, enabled: boolean) =>
  useQuery({
    queryKey: ["getmechaniccontact", id, enabled],
    queryFn: async () => {
      const response = await getMechanicContactInfo(id);
      return response;
    },
    enabled,
  });
