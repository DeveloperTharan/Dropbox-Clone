"use client";

import React from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { useClerk } from "@clerk/nextjs";
import { Forward, KeyRound, MoreHorizontal, PenSquare } from "lucide-react";
import HandleRename from "./handlers/handle-rename";
import HandleFavorite from "./handlers/handle-favorite";
import HandleAchive from "./handlers/handle-achive";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type FileType = {
  id: string;
  timestamp: number;
  userID: string;
  filename: string;
  downloadURL: string;
  size: number;
  isArchived: boolean;
  isFavorite: boolean;
  type: string;
};

export default function Menu({ file }: { file: FileType }) {
  const { user } = useClerk();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="h-8 w-8 p-2 rounded-[5px] hover:bg-gray-200 dark:hover:bg-black" />
      </PopoverTrigger>
      <PopoverContent className="w-44 p-1" align="end">
        <div className="truncate border-b p-2 text-xs">
          {user?.fullName}&apos; File
        </div>
        <HandleRename initialData={file?.filename} id={file?.id}>
          <div
            className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
            role="button"
          >
            <PenSquare className="h-4 w-4" />
            <span className="text-sm">Rename</span>
          </div>
        </HandleRename>
        <div
          className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
          role="button"
        >
          <HandleFavorite initialData={file?.isFavorite} id={file?.id} />
        </div>
        <div
          className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
          role="button"
        >
          <Forward className="h-4 w-4" />
          <span className="text-sm">Share</span>
        </div>
        <div
          className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
          role="button"
        >
          <KeyRound className="h-4 w-4" />
          <span className="text-sm">Signature</span>
        </div>
        <div
          className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
          role="button"
        >
          <HandleAchive initialData={file?.isArchived} id={file?.id} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
