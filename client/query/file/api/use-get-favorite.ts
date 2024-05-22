import { getFavoriteFiles, getFilesByFolderId } from "@/action/file";
import { useQuery } from "@tanstack/react-query";

export const useGetFavoriteFiles = () => {
  const query = useQuery({
    queryKey: ["favorite_files"],
    queryFn: async () => {
      const response = await getFavoriteFiles();

      return response;
    },
  });

  return query;
};
