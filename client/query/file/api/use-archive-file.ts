import { ArchiveFile } from "@/action/file";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = { id: string };
type ResponseType = ApiResponseType;

export const useArchiveFile = (folderId: string) => {
  const { toast } = useToast();
  const queruClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await ArchiveFile(data.id);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "File",
        description: `${data.success}`,
      });

      queruClient.invalidateQueries({ queryKey: ["files_folderId", folderId] });
      queruClient.invalidateQueries({ queryKey: ["favorite_files"] });
      queruClient.invalidateQueries({ queryKey: ["archive_files"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: `${error.message}`,
          variant: "destructive",
        });
      }
    },
  });

  return mutation;
};
