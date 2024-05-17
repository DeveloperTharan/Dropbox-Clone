"use client";

import React, { useState, useTransition } from "react";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { renameFolder } from "@/schema/folder";

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
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { RenameFolder } from "@/action/folder";

interface CreateFolderModelProps {
  children: React.ReactNode;
  userId: string;
  folderId: string;
}

export const RenameFolderModel = ({
  children,
  userId,
  folderId,
}: CreateFolderModelProps) => {
  const [Open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof renameFolder>>({
    resolver: zodResolver(renameFolder),
    defaultValues: {
      newName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof renameFolder>) => {
    startTransition(() => {
      RenameFolder(values, userId, folderId)
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
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename your folder!</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="newName"
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
                  {isPending ? <Spinner size={"lg"} /> : "Rename"}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
