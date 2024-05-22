"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { FileType } from "@/types/file-type";
import { FolderType } from "@/types/folder-type";
import { formatDate } from "@/utils/formate-date";
import { useOpenSearchModel } from "@/hooks/use-open";
import { defaultStyles, FileIcon } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";
import { useGetFolders } from "@/query/folder/api/use-get-folders";
import { useGetAllFiles } from "@/query/file/api/use-get-all-files";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Spinner } from "../ui/spinner";

export const SearchModel = () => {
  const { isOpen, onClose, onOpen } = useOpenSearchModel();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const fileQuery = useGetAllFiles();
  const folderQuery = useGetFolders();

  return (
    <>
      <CommandDialog open={isOpen} onOpenChange={onClose}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No folder or file found.</CommandEmpty>
          {(fileQuery.data?.length === 0 || folderQuery.data?.length === 0) && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {fileQuery.isLoading && (
            <CommandGroup heading="Files">
              <div className="w-full my-10 flex items-center justify-center">
                <Spinner size={"lg"} />
              </div>
            </CommandGroup>
          )}
          {fileQuery.data?.length === 0 && (
            <CommandGroup heading="Files">No files found.</CommandGroup>
          )}
          {fileQuery.data && (
            <CommandGroup heading="Files">
              {fileQuery.data?.map((file: FileType) => {
                const type = file?.fileType;
                const extension = type.split("/")[1];

                return (
                  <CommandItem key={file.id}>
                    <Link
                      href={file.fileURL}
                      target="_blank"
                      className="flex items-center justify-between w-full"
                      key={file.id}
                    >
                      <div className="flex items-center justify-center gap-x-4">
                        <div className="h-6 w-6">
                          <FileIcon
                            extension={extension}
                            labelColor={FileColorExtension[extension]}
                            //@ts-ignore
                            {...defaultStyles[extension]}
                          />
                        </div>
                        <h1 className="tex-lg w-32 truncate text-neutral-200">
                          {file.fileName}
                        </h1>
                      </div>
                      <p className="text-sm text-neutral-500">
                        {formatDate(file.createdAt as unknown as number)}
                      </p>
                    </Link>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
          <CommandSeparator />
          {folderQuery.isLoading && (
            <CommandGroup heading="Folders">
              <div className="w-full my-10 flex items-center justify-center">
                <Spinner size={"lg"} />
              </div>
            </CommandGroup>
          )}
          {folderQuery.data?.length === 0 && (
            <CommandGroup heading="Files">No files found.</CommandGroup>
          )}
          {folderQuery.data && (
            <CommandGroup heading="Folders">
              {folderQuery.data?.map((folder: FolderType) => (
                <CommandItem key={folder.id}>
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src="/folder.png"
                        alt="folder"
                        width={20}
                        height={20}
                      />
                      <p className="tex-lg w-32 truncate text-neutral-200">
                        {folder.name}
                      </p>
                    </div>
                    <p className="text-sm text-neutral-500">
                      {formatDate(folder.createdAt as unknown as number)}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
