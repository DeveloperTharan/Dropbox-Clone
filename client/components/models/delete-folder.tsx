"use client";

import React from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";
import { useOpenDeleteModel } from "@/hooks/folder/use-open";
import { useDeleteFolder } from "@/query/folder/api/use-delete-folder";
import { useToast } from "../ui/use-toast";

export const FolderDeleteModel = () => {
  const { isOpen, onClose, id } = useOpenDeleteModel();

  const { toast } = useToast();

  const deleteMutation = useDeleteFolder();

  const onConfirm = () => {
    if (!id)
      return toast({
        title: "Folder",
        description: "Folder id is missing!",
        variant: "destructive",
      });

    deleteMutation.mutate(
      { folderId: id },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Folder!</DialogTitle>
          <DialogDescription>
            This action can delete all files and folders inside folder, and can
            not undo this action.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start w-full">
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={onConfirm}
          >
            {deleteMutation.isPending ? <Spinner size={"lg"} /> : "Delete"}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="ghost" className="w-full">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
