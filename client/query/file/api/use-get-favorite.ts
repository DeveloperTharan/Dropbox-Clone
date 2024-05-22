import { getFavoriteFiles, getFilesByFolderId } from "@/action/file";
import { FileType } from "@/types/file-type";
import { useQuery } from "@tanstack/react-query";

export const useGetFavoriteFiles = () => {
  const query = useQuery({
    queryKey: ["favorite_files"],
    queryFn: async () => {
      const response = await getFavoriteFiles();
      const data: FileType[] = response;

      return data;
    },
  });

  return query;
};
