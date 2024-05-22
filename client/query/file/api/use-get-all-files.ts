import { getAllFiles } from "@/action/file";
import { useQuery } from "@tanstack/react-query";

export const useGetAllFiles = () => {
  const query = useQuery({
    queryKey: ["all_files"],
    queryFn: async () => {
      const response = await getAllFiles();

      return response;
    },
  });

  return query;
};
