import { getFolders } from "@/action/folder";
import { useQuery } from "@tanstack/react-query";

export const useGetFolders = () => {
  const query = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = await getFolders();

      return response;
    },
  });

  return query;
};
