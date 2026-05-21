import { useQuery } from "@tanstack/react-query";
import { getMechanicsServices } from "../services";

export const useGetMechanicServices = () =>
  useQuery({
    queryKey: ["getmyservices"],
    queryFn: async () => {
      const problems = getMechanicsServices();
      return problems;
    },
  });
