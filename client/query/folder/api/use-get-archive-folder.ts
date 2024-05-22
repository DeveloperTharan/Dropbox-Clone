import { getArchiveFolders, getFolders } from "@/action/folder";
import { FolderType } from "@/types/folder-type";
import { useQuery } from "@tanstack/react-query";

export const useGetArchiveFolders = () => {
  const query = useQuery({
    queryKey: ["archive_folders"],
    queryFn: async () => {
      const response = await getArchiveFolders();
      const data: FolderType[] = response;

      return data;
    },
  });

  return query;
};
