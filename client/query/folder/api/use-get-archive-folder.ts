import { getArchiveFolders, getFolders } from "@/action/folder";
import { useQuery } from "@tanstack/react-query";

export const useGetArchiveFolders = () => {
  const query = useQuery({
    queryKey: ["archive_folders"],
    queryFn: async () => {
      const response = await getArchiveFolders();
      return response;
    },
  });

  return query;
};
