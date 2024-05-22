"use client";

import React from "react";

import { useOpenDeleteModel } from "@/hooks/file/use-open";
import { useDeleteFile } from "@/query/file/api/use-delete-file";

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

export const FileDeleteModel = () => {
  const { isOpen, onClose, id, folderId } = useOpenDeleteModel();

  const deleteMutation = useDeleteFile(id!);

  const onConfirm = () => {
    deleteMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete File!</DialogTitle>
          <DialogDescription>
            This action can delete the files and, can not undo this action.
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
