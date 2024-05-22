import { DeleteFile } from "@/action/file";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = ApiResponseType;

export const useDeleteFile = (id: string) => {
  const { toast } = useToast();
  const queruClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await DeleteFile(id);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "File",
        description: `${data.success}`,
      });

      queruClient.invalidateQueries({ queryKey: ["archive_files"] });
      queruClient.invalidateQueries({ queryKey: ["all_files"] });
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
