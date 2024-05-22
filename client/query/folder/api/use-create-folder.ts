import { z } from "zod";
import { CreateFolder } from "@/action/folder";
import { createFolderSchema } from "@/schema/folder";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = z.infer<typeof createFolderSchema>;
type ResponseType = ApiResponseType;

export const useCreateFolder = () => {
  const { toast } = useToast();
  const queruClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await CreateFolder(data);

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
