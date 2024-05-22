import { z } from "zod";
import { signUp } from "@/action/auth";
import { signUpSchema } from "@/schema/auth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";

type RequestType = z.infer<typeof signUpSchema>;
type ResponseType = ApiResponseType;

export const useSignUp = () => {
  const { toast } = useToast();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await signUp(data);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "signup",
        description: `${data.success}`,
      });
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
