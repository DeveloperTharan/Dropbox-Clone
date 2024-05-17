"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

import { toast } from "sonner";
import { FileType } from "@/types/file-type";
import { UnArchiveFile } from "@/action/file";
import { Spinner } from "@/components/ui/spinner";
import { defaultStyles, FileIcon } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";

import { Trash2, Undo2 } from "lucide-react";
import { FileDeleteModel } from "@/components/models/file-delete";

export const TrashFileItems = ({ files }: { files: FileType[] }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleUnArchive = (folderId: string) => {
    startTransition(() => {
      UnArchiveFile(folderId)
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
    <>
      <h2 className="text-2xl font-semibold ms-1 mb-4">Deleted files</h2>
      {!files ? (
        <div className="flex justify-center items-center my-20">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          {files.length === 0 ? (
            <p className="w-full h-[calc(100vh-50vh)] flex items-center justify-center text-neutral-400">
              No files are in Trash
            </p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-5 my-4">
              {files?.map((file) => {
                const type = file?.fileType;
                const extension = type.split("/")[1];
                return (
                  <div
                    className="border-0 group flex flex-col justify-center items-center relative"
                    key={file?.id}
                  >
                    <div className="absolute -top-4 -right-5 z-50 flex gap-x-1 opacity-0 group-hover:opacity-100">
                      {isPending ? (
                        <Spinner size={"lg"} />
                      ) : (
                        <div className="w-full">
                          <Undo2
                            className="w-6 h-6 hover:bg-primary/30 p-1 rounded-lg shadow-lg"
                            role="button"
                            onClick={() => handleUnArchive(file.id)}
                          />
                        </div>
                      )}
                      <FileDeleteModel
                        fileName={file.fileName}
                        fileId={file.id}
                      >
                        <Trash2
                          className="w-6 h-6 hover:bg-primary/30 p-1 rounded-lg shadow-lg"
                          role="button"
                        />
                      </FileDeleteModel>
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
