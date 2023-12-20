"use client";

import React from "react";
import { Doc } from "@/convex/_generated/dataModel";
import { useClerk } from "@clerk/nextjs";
import { Forward, KeyRound, MoreHorizontal, PenSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HandleRename from "./handle-rename";
import HandleFavorite from "./handle-favorite";
import HandleAchive from "./handle-achive";

function Menu({ file }: { file: Doc<"File"> }) {
  const { user } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <MoreHorizontal className="h-8 w-8 p-2 rounded-[5px] hover:bg-gray-200 dark:hover:bg-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="truncate">
          {user?.fullName}&apos; File
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <HandleRename>
          <DropdownMenuItem className="flex flex-row gap-x-2 justify-start items-center">
            <PenSquare className="h-4 w-4" />
            <span className="text-sm">Rename</span>
          </DropdownMenuItem>
        </HandleRename>
        <DropdownMenuItem className="flex flex-row gap-x-2 justify-start items-center">
          <HandleFavorite initialData={file?.isFavorite} id={file?._id} />
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row gap-x-2 justify-start items-center">
          <Forward className="h-4 w-4" />
          <span className="text-sm">Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row gap-x-2 justify-start items-center">
          <KeyRound className="h-4 w-4" />
          <span className="text-sm">Signature</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <HandleAchive initialData={file?.isArchived} id={file?._id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Menu;
