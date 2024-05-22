"use client";

import React from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { createFolderSchema } from "@/schema/folder";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOpenCreateModel } from "@/hooks/folder/use-open";

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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateFolder } from "@/query/folder/api/use-create-folder";

export const CreateFolderModel = () => {
  const { isOpen, onClose, id } = useOpenCreateModel();

  const createMutation = useCreateFolder();

  const form = useForm<z.infer<typeof createFolderSchema>>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: {
      folder_name: "",
      parentfolder_id: id,
    },
  });

  const onSubmit = (values: z.infer<typeof createFolderSchema>) => {
    const completeValue = { ...values, parentfolder_id: id };
    createMutation.mutate(completeValue, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new folder!</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
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
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  className="w-full"
                >
                  {createMutation.isPending ? (
                    <>
                      <Spinner size={"lg"} />
                      <span className="ml-2">Create</span>
                    </>
                  ) : (
                    "Create"
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
