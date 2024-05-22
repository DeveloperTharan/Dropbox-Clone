"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { renameFile } from "@/schema/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOpenRenameModel } from "@/hooks/file/use-open";
import { useRenameFile } from "@/query/file/api/use-rename-file";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Spinner } from "../ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const RenameFileModel = () => {
  const { isOpen, onClose, id, folderId } = useOpenRenameModel();

  const renameMutation = useRenameFile(id!, folderId!);

  const form = useForm<z.infer<typeof renameFile>>({
    resolver: zodResolver(renameFile),
    defaultValues: {
      newname: "",
    },
  });

  const onSubmit = (values: z.infer<typeof renameFile>) => {
    renameMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename your folder!</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="newname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your folder name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="eg: 'notes'"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={renameMutation.isPending}
                  className="w-full"
                >
                  {renameMutation.isPending ? (
                    <>
                      <Spinner size={"lg"} /> <span>Rename</span>
                    </>
                  ) : (
                    "Rename"
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
