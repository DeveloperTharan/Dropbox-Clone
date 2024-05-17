"use client";

import React, { useTransition } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Forward,
  KeyRound,
  MoreHorizontal,
  PenSquare,
  Star,
  Trash,
  StarOff,
} from "lucide-react";
import { FileType } from "@/types/file-type";
import { Spinner } from "@/components/ui/spinner";
import { RenameFileModel } from "@/components/models/file-rename";
import { ArchiveFile, HandleFavorite } from "@/action/file";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const FileMenu = ({ file }: { file: FileType }) => {
  const [isTrashPending, startTrashTransition] = useTransition();
  const [isFavoritePending, startFavoriteTransition] = useTransition();

  const router = useRouter();

  const handleFavorite = (fileId: string) => {
    startFavoriteTransition(() => {
      HandleFavorite(fileId)
        .then((data) => {
          if (data.success) return toast.success(data.success);
          if (data.error) return toast.error(data.error);
        })
        .finally(() => {
          router.refresh();
        });
    });
  };

  const handleTrash = (fileId: string) => {
    startTrashTransition(() => {
      ArchiveFile(fileId)
        .then((data) => {
          if (data.success) return toast.success(data.success);
          if (data.error) return toast.error(data.error);
        })
        .finally(() => {
          router.refresh();
        });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <MoreHorizontal className="h-8 w-8 p-2 rounded-[5px] hover:bg-gray-200 dark:hover:bg-neutral-600/60" />
      </PopoverTrigger>
      <PopoverContent className="w-52 p-1" align="end">
        <div className="truncate border-b p-2 text-xs">{file.fileName}</div>
        <RenameFileModel fileId={file.id}>
          <div
            className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
            role="button"
          >
            <PenSquare className="h-4 w-4" />
            <span className="text-sm">Rename</span>
          </div>
        </RenameFileModel>
        <div
          className="flex flex-row gap-x-2 justify-start items-center my-1 hover:bg-gray-200 
          dark:hover:bg-gray-800 w-full p-1"
          role="button"
          onClick={() => handleFavorite(file.id)}
        >
          {isFavoritePending ? (
            <div className="w-full flex items-center justify-center">
              <Spinner size={"lg"} />
            </div>
          ) : (
            <>
              {!file.favorite ? (
                <>
                  <Star className="h-4 w-4" />
                  <span className="text-sm">Add to Favorite</span>
                </>
              ) : (
                <>
                  <StarOff className="h-4 w-4" />
                  <span className="text-sm">Remove from Favorite</span>
                </>
              )}
            </>
          )}
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
          onClick={() => handleTrash(file.id)}
        >
          {isTrashPending ? (
            <div className="w-full flex items-center justify-center">
              <Spinner size={"lg"} />
            </div>
          ) : (
            <>
              <Trash className="h-4 w-4" />
              <span className="text-sm">Trash</span>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
