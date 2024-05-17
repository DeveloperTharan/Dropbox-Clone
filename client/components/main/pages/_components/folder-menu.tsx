"use client";

import React from "react";

import { RenameFolderModel } from "@/components/models/folder-rename";
import { FolderArchiveModel } from "@/components/models/folder-archive";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { CiTrash } from "react-icons/ci";
import { HiOutlinePencilSquare } from "react-icons/hi2";

interface FolderMenuProps {
  children: React.ReactNode;
  folderId: string;
  foldername: string;
  userId: string;
}

export const FolderMenu = ({
  children,
  folderId,
  foldername,
  userId,
}: FolderMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-44 p-1" align="start">
        <div className="truncate border-b p-2 text-xs">{foldername}</div>
        <RenameFolderModel userId={userId} folderId={folderId}>
          <div
            className="flex flex-row gap-x-1 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
            role="button"
          >
            <HiOutlinePencilSquare className="w-4 h-4" />
            <span className="ml-2">Rename</span>
          </div>
        </RenameFolderModel>
        <FolderArchiveModel
          foldername={foldername}
          folderId={folderId}
          userId={userId}
        >
          <div
            className="flex flex-row gap-x-1 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
            role="button"
          >
            <CiTrash className="w-4 h-4" />
            <span className="ml-2">Trash</span>
          </div>
        </FolderArchiveModel>
      </PopoverContent>
    </Popover>
  );
};

/*  */
