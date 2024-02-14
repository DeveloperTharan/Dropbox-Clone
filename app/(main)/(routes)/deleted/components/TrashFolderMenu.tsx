"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { IterationCcw, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

interface TrashFileMenuProps {
  children: React.ReactNode;
  id: Id<"Folder">;
}

export default function TrashFileMenu({ children, id }: TrashFileMenuProps) {
  const { user } = useClerk();
  const { userId } = useAuth();
  const router = useRouter();

  if(!userId){
    redirect("/sign-in");
  }

  const restore = useMutation(api.file.restoreFolder);
  const remove = useMutation(api.file.removFolder);

  const handleRestore = (e: React.MouseEvent) => {
    e.preventDefault();

    const promise = restore({
      id: id,
      userID: userId as string,
    });

    toast.promise(promise, {
      loading: "Restoring your folder...",
      success: "Successfully restored!",
      error: "Error! try again.",
      duration: 2000,
    });
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();

    const promise = remove({
      id: id,
      userID: userId as string,
    }).finally(() => router.push("/deleted"));

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted successfully",
      error: "Error! try again.",
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none relative top-0 ml-auto">
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="truncate">
          {user?.fullName}&apos; File
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-row gap-x-2 justify-start items-center"
          role="button"
          onClick={handleRestore}
        >
          <IterationCcw className="h-4 w-4" />
          <span className="text-sm">Restore</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row gap-x-2 justify-start items-center"
          role="button"
          onClick={handleRemove}
        >
          <Trash2 className="h-4 w-4" />
          <span className="text-sm">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
