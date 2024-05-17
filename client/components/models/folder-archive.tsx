"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { ArchiveFolder } from "@/action/folder";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "../ui/spinner";

interface FolderArchiveModelProps {
  children: React.ReactNode;
  foldername: string;
  folderId: string;
  userId: string;
}

export const FolderArchiveModel = ({
  children,
  folderId,
  foldername,
  userId,
}: FolderArchiveModelProps) => {
  const [Open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const onConfirm = () => {
    startTransition(() => {
      ArchiveFolder(folderId, userId)
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Folder!</DialogTitle>
          <DialogDescription>
            Delete this folder {foldername}, this action can un-do.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start w-full">
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={onConfirm}
          >
            {isPending ? <Spinner size={"lg"} /> : "Delete"}
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
