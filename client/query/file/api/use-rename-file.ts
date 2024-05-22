import { z } from "zod";
import { RenameFile } from "@/action/file";
import { renameFile } from "@/schema/file";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = z.infer<typeof renameFile>;
type ResponseType = ApiResponseType;

export const useRenameFile = (id: string, folderId: string) => {
  const { toast } = useToast();
  const queruClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await RenameFile(data, id);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "File",
        description: `${data.success}`,
      });

      queruClient.invalidateQueries({ queryKey: ["all_files"] });
      queruClient.invalidateQueries({ queryKey: ["files_folderId", folderId] });
      queruClient.invalidateQueries({ queryKey: ["favorite_files"] });
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
