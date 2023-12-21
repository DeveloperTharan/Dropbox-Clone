"use client";

import React from "react";
import { Id } from "@/convex/_generated/dataModel";
import {
  ChevronRight,
  Folder,
  FolderOpen,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import CreateFolder from "@/components/createfolder-model";
import FolderMenu from "@/components/folder-menu";

interface itemProp {
  onClick?: () => void;
  label: string;
  id?: Id<"Folder">;
  active?: boolean;
  expanded?: boolean;
  level?: number;
  onExpand?: () => void;
}

export default function Item({
  onClick,
  label,
  id,
  active,
  expanded,
  level,
  onExpand,
}: itemProp) {
  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{
        paddingLeft: level ? `${level * 12 + 12}px` : "12px",
      }}
      className={`flex gap-x-3 justify-start items-center pl-5 py-[10px] w-full hover:bg-neutral-200
        dark:hover:bg-gray-800 group ${
          active ? "bg-neutral-200 dark:bg-gray-800" : ""
        }`}
    >
      {!!id && ( //string into boolean
        <div className="text-[12px] font-light ml-3" onClick={handleExpand}>
          <ChevronRight
            className={`h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer
            ${expanded ? "rotate-90" : "rotate-0"}`}
          />
        </div>
      )}
      {!expanded ? (
        <Folder className="h-4 w-4" />
      ) : (
        <FolderOpen className="h-4 w-4" />
      )}
      <span className="truncate font-medium text-[12px]">{label}</span>

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2 mr-2">
          <CreateFolder id={id}>
            <div
              className="text-[12px] font-light ml-auto"
              /* onClick={handelCreateInside} */
            >
              <Plus
                className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
              group-hover:opacity-100 transition delay-300 ease-in-out"
              />
            </div>
          </CreateFolder>
          <FolderMenu id={id}>
            <MoreHorizontal
              className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
              group-hover:opacity-100 transition delay-300 ease-in-out"
            />
          </FolderMenu>
        </div>
      )}
    </div>
  );
}
