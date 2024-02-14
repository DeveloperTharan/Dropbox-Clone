"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { redirect } from "next/navigation";

interface HandleRenameProps {
  children: React.ReactNode;
  id: string;
}

export default function HandleRenameFolder({
  children,
  id,
}: HandleRenameProps) {
  const [name, setName] = useState<string>("");

  const rename = useMutation(api.file.updateFolder);

  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const handleRename = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setName(name);
    const promise = rename({
      id: id as Id<"Folder">,
      userID: userId as string,
      name: name
    }).finally(() => setName(""));

    toast.promise(promise, {
      loading: "Renaming....",
      success: "Renamed successfully",
      error: "Error! try again",
      duration: 2000
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-96 h-40">
        <DialogHeader>
          <DialogTitle className="mb-2">Rename your File!</DialogTitle>
          <DialogDescription>
            <Input placeholder="name your folder" onChange={(e) => setName(e.target.value)} />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="default" onClick={handleRename}>
              Rename
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
