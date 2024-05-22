import { z } from "zod";
import { signIn } from "@/action/auth";
import { useRouter } from "next/navigation";
import { signInSchema } from "@/schema/auth";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponseType } from "@/types/response-type";

type RequestType = z.infer<typeof signInSchema>;
type ResponseType = ApiResponseType;

export const useSignIn = (callbackUrl: string) => {
  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (data) => {
      const response = await signIn(data);

      if (response.error) throw new Error(response.error);

      return response;
    },
    onSuccess: (data) => {
      toast({
        title: "signIn",
        description: `${data.success}`,
      });
      router.push(callbackUrl);
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
