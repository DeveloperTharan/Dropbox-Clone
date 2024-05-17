"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { SignIn } from "@/action/auth";
import { toast } from "sonner";

export const SignInForm = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    startTransition(() => {
      SignIn(values).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/dashboard");
          return;
        }
        if (data.error) return toast.error(data.error);
      });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email"
                  {...field}
                  className="rounded-sm w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="password"
                  type="password"
                  {...field}
                  className="rounded-sm w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full rounded-sm text-neutral-200"
          disabled={isPending}
        >
          {isPending ? (
            <div className="flex items-center justify-center gap-2">
              <Spinner size={"lg"} />
              <span>SignIn</span>
            </div>
          ) : (
            "SignIn"
          )}
        </Button>
      </form>
    </Form>
  );
};
