"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { renameFolder } from "@/schema/folder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOpenRenameModel } from "@/hooks/folder/use-open";
import { useRenameFolder } from "@/query/folder/api/use-rename-folder";

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
import { Spinner } from "../ui/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const RenameFolderModel = () => {
  const { isOpen, onClose, id } = useOpenRenameModel();

  const renameMutation = useRenameFolder(id);

  const form = useForm<z.infer<typeof renameFolder>>({
    resolver: zodResolver(renameFolder),
    defaultValues: {
      newName: "",
    },
  });

  const onSubmit = (values: z.infer<typeof renameFolder>) => {
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
