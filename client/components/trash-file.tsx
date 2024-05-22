"use client";

import React from "react";
import Link from "next/link";

import { FileType } from "@/types/file-type";
import { Spinner } from "@/components/ui/spinner";
import { defaultStyles, FileIcon } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";

import { Trash2, Undo2 } from "lucide-react";
import { useGetArchiveFiles } from "@/query/file/api/use-get-archive-file";
import { useOpenDeleteModel } from "@/hooks/file/use-open";
import { useUnArchiveFile } from "@/query/file/api/use-unarchive-file";
import { useQueryClient } from "@tanstack/react-query";

export const TrashFileItems = () => {
  const { onOpen } = useOpenDeleteModel();
  const queruClient = useQueryClient();

  const { data, isLoading } = useGetArchiveFiles();
  const unarchiveFile = useUnArchiveFile();

  return (
    <>
      <h2 className="text-2xl font-semibold ms-1 mb-4">Deleted files</h2>
      {isLoading ? (
        <div className="flex justify-center items-center my-20">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <p className="w-full h-[calc(100vh-70vh)] flex items-center justify-center text-neutral-400">
              No files are in Trash
            </p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-5 my-4">
              {data?.map((file: FileType) => {
                const type = file?.fileType;
                const extension = type.split("/")[1];
                return (
                  <div
                    className="border-0 group flex flex-col justify-center items-center relative"
                    key={file?.id}
                  >
                    <div className="absolute -top-4 -right-10 z-50 flex gap-x-3 opacity-0 group-hover:opacity-100">
                      {false ? (
                        <Spinner size={"lg"} />
                      ) : (
                        <button
                          className="p-1 hover:bg-primary/30 rounded-md opacity-0 group-hover:opacity-100"
                          role="button"
                          onClick={() =>
                            unarchiveFile.mutate(
                              { id: file?.id },
                              {
                                onSuccess: () => {
                                  queruClient.invalidateQueries({
                                    queryKey: ["files_folderId", file.folderId],
                                  });
                                },
                              }
                            )
                          }
                          disabled={unarchiveFile.isPending}
                        >
                          <Undo2 className="size-4" />
                        </button>
                      )}
                      <button
                        className="p-1 hover:bg-primary/30 rounded-md opacity-0 group-hover:opacity-100"
                        role="button"
                        onClick={() => onOpen(file.id, file.folderId)}
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <Link
                      href={file?.fileURL}
                      target="_blank"
                      className="flex flex-col gap-y-4 justify-center items-center p-2"
                    >
                      <div className="h-10 w-10">
                        <FileIcon
                          extension={extension}
                          labelColor={FileColorExtension[extension]}
                          //@ts-ignore
                          {...defaultStyles[extension]}
                        />
                      </div>
                      <p className="truncate text-sm text-neutral-500 w-20 text-center">
                        {file?.fileName}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
};
