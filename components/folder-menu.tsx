"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import { PenSquare, Trash2 } from "lucide-react";
import HandleRenameFolder from "./handlers/handle-renamefolder";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import HandleAchiveFolder from "./handlers/handle-achivefolder";

export default function FolderMenu({
  children,
  id,
}: {
  children: React.ReactNode;
  id: Id<"Folder">;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-44 p-1" align="start">
        <HandleRenameFolder id={id}>
          <div
            className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
            dark:hover:bg-gray-800 w-full p-1"
            role="button"
          >
            <PenSquare className="h-4 w-4" />
            <span className="text-sm">Rename</span>
          </div>
        </HandleRenameFolder>
        <HandleAchiveFolder id={id}>
          <div
            className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
            role="button"
          >
            <Trash2 className="h-4 w-4" />
            <span className="text-sm">Delete</span>
          </div>
        </HandleAchiveFolder>
      </PopoverContent>
    </Popover>
  );
}
