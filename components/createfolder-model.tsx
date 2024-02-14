"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { redirect } from "next/navigation";

export default function CreateFolder({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: Id<"Folder">;
}) {
  const [name, setName] = useState<string>("Doc");
  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const createFolder = useMutation(api.file.creatrFolder);

  const handleCreateFolder = () => {
    setName(name);
    const promise = createFolder({
      name: name,
      userID: userId as string,
      parentFolder: id,
    });

    toast.promise(promise, {
      loading: "Creating folder...",
      success: `Successfully Created! ${name}`,
      error: "Error! try again.",
      duration: 2000,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Name
            </Label>
            <Input
              id="link"
              defaultValue="Doc"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCreateFolder}
            >
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
