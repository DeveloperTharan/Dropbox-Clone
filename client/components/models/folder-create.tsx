"use client";

import React, { useState, useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFolderSchema } from "@/schema/folder";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFolder } from "@/action/folder";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

interface CreateFolderModelProps {
  children: React.ReactNode;
  userId: string;
  parentFolderId?: string | null;
}

export const CreateFolderModel = ({
  children,
  userId,
  parentFolderId = null,
}: CreateFolderModelProps) => {
  const [Open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof createFolderSchema>>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      user_id: userId,
      folder_name: "",
      parentfolder_id: parentFolderId,
    },
  });

  const onSubmit = (values: z.infer<typeof createFolderSchema>) => {
    startTransition(() => {
      createFolder(values)
        .then((data) => {
          if (data.success) return toast.success(data.success);
          if (data.error) return toast.error(data.error);
        })
        .finally(() => {
          setOpen(false);
          router.refresh();
        });
    });
  };

  return (
    <Dialog open={Open} onOpenChange={() => setOpen(!Open)}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new folder!</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="folder_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your folder name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: 'Doc'"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Spinner size={"lg"} /> : "Create"}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
