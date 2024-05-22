import { z } from "zod";
import { RenameFolder } from "@/action/folder";
import { renameFolder } from "@/schema/folder";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = z.infer<typeof renameFolder>;
type ResponseType = ApiResponseType;

export const useRenameFolder = (folderId?: string | null) => {
  const { toast } = useToast();
  const queruClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      if (!folderId) throw new Error("Folder id missing!");

      const response = await RenameFolder(data, folderId);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "Folder",
        description: `${data.success}`,
      });

      queruClient.invalidateQueries({ queryKey: ["folders"] });
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
