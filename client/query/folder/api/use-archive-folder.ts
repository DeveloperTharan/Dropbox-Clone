import { archiveFolder } from "@/action/folder";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = { folderId: string };
type ResponseType = ApiResponseType;

export const useArchiveFolder = () => {
  const { toast } = useToast();
  const queruClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await archiveFolder(data.folderId);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "Folder",
        description: `${data.success}`,
      });

      queruClient.invalidateQueries({ queryKey: ["folders"] });
      queruClient.invalidateQueries({ queryKey: ["archive_folders"] });
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
