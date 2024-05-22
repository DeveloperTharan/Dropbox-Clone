import { getFilesByFolderId } from "@/action/file";
import { useQuery } from "@tanstack/react-query";

export const useGetFilesByFolderId = (id: string) => {
  const query = useQuery({
    queryKey: ["files_folderId", id],
    queryFn: async () => {
      const response = await getFilesByFolderId(id);

      return response;
    },
  });

  return query;
};
