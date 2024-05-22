"use client";

import React from "react";

import { ChevronRight, Ellipsis, Folder, FolderOpen, Plus } from "lucide-react";
import { useOpenCreateModel } from "@/hooks/folder/use-open";
import { FolderMenu } from "@/components/folder-menu";

interface itemProp {
  onClick?: () => void;
  label: string;
  id?: string;
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
  const { onOpen } = useOpenCreateModel();

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  return (
    <div
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
      <span className="truncate font-medium text-[12px]" onClick={onClick}>
        {label}
      </span>

      {!!id && (
        <div
          className="ml-auto flex items-center gap-x-2 mr-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            onOpen(id);
          }}
        >
          <div className="text-[12px] font-light ml-auto">
            <Plus
              className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
              group-hover:opacity-100"
            />
          </div>
          <FolderMenu id={id} name={label}>
            <div className="text-[12px] font-light ml-auto">
              <Ellipsis
                className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
              group-hover:opacity-100"
              />
            </div>
          </FolderMenu>
        </div>
      )}
    </div>
  );
}
