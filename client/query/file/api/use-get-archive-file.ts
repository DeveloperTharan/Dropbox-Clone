import { getArchiveFiles } from "@/action/file";
import { FileType } from "@/types/file-type";
import { useQuery } from "@tanstack/react-query";

export const useGetArchiveFiles = () => {
  const query = useQuery({
    queryKey: ["archive_files"],
    queryFn: async () => {
      const response = await getArchiveFiles();

      const data: FileType[] = response;

      return data;
    },
  });

  return query;
};
