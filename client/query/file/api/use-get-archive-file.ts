import { getArchiveFiles } from "@/action/file";
import { useQuery } from "@tanstack/react-query";

export const useGetArchiveFiles = () => {
  const query = useQuery({
    queryKey: ["archive_files"],
    queryFn: async () => {
      const response = await getArchiveFiles();

      return response;
    },
  });

  return query;
};
