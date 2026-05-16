import { useQuery } from "@tanstack/react-query";
import { getUsersProblems } from "../services";

export const useGetUsersProblems = () =>
  useQuery({
    queryKey: ["getuserproblems"],
    queryFn: async () => {
      const problems = getUsersProblems();
      return problems;
    },
  });
