import { getFolders } from "@/action/folder";
import { FolderType } from "@/types/folder-type";
import { useQuery } from "@tanstack/react-query";

export const useGetFolders = () => {
  const query = useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = await getFolders();

      const data: FolderType[] = response;

      return data;
    },
  });

  return query;
};
