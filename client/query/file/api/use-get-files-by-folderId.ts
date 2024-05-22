import { getFilesByFolderId } from "@/action/file";
import { FileType } from "@/types/file-type";
import { useQuery } from "@tanstack/react-query";

export const useGetFilesByFolderId = (id: string) => {
  const query = useQuery({
    queryKey: ["files_folderId", id],
    queryFn: async () => {
      const response = await getFilesByFolderId(id);

      const data: FileType[] = response;

      return data;
    },
  });

  return query;
};
