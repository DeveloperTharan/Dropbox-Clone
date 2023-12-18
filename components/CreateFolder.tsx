"use client";

import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase.config";
import { useAuth } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FolderClosed } from "lucide-react";
import { Input } from "./ui/input";

export default function UplodeForm({ children }: { children: React.ReactNode }) {
  const [folderName, setFolderName] = useState<String>("");
  const { userId } = useAuth();

  const docId = Date.now().toString();

  const onKeyCreate = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setFolderName(folderName);
      await setDoc(doc(db, "Folder", docId), {
        name: folderName,
        id: docId,
        userId: userId,
      });
    }
  };

  const OnClickCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFolderName(folderName);
    await setDoc(doc(db, "Folder", docId), {
      name: folderName,
      id: docId,
      userId: userId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-5 justify-center items-center p-4">
          <FolderClosed className="w-12 h-12" />
          <Input
            type="text"
            placeholder="Name your File"
            onChange={(e) => setFolderName(e.target.value)}
            onKeyDown={onKeyCreate}
          />
          <DialogClose asChild>
            <Button size={"lg"} variant={"default"} onClick={OnClickCreate}>
              Create
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}