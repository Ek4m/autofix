import { useQuery } from "@tanstack/react-query";
import { getMechanicPanelInfo } from "../services";

export const useGetMechanicPanelInfo = () =>
  useQuery({
    queryKey: ["getmechanicpanelinfo"],
    queryFn: async () => {
      const problems = getMechanicPanelInfo();
      return problems;
    },
  });
