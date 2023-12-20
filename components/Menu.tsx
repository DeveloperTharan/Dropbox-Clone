"use client";

import React from "react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useClerk } from "@clerk/nextjs";
import {
  Forward,
  KeyRound,
  MoreHorizontal,
  PenSquare,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import RenameModel from "./Rename-model";
import HandleFavorite from "./handle-favorite";
import HandleAchive from "./handle-achive";

function Menu({ file }: { file: Doc<"File"> }) {
  const { user } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontal className="h-8 w-8 p-2 rounded-[5px] hover:bg-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="truncate">
          {user?.fullName}&apos; File
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <RenameModel>
          <DropdownMenuItem className="flex flex-row gap-x-2 justify-start items-center">
            <PenSquare className="h-4 w-4" />
            <span className="text-sm">Rename</span>
          </DropdownMenuItem>
        </RenameModel>
        <DropdownMenuItem className="flex flex-row gap-x-2 justify-start items-center">
          <HandleFavorite initialData={file?.isFavorite} id={file?._id}/>
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
