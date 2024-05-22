import { getUser } from "@/action/auth";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await getUser();

      return response;
    },
  });

  return query;
};
