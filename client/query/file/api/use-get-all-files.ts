import { getAllFiles } from "@/action/file";
import { FileType } from "@/types/file-type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllFiles = () => {
  const query = useQuery({
    queryKey: ["all_files"],
    queryFn: async () => {
      const response = await getAllFiles();

      const data: FileType[] = response;

      return data;
    },
  });

  return query;
};
