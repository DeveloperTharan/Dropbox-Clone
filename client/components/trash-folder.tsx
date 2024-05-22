"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

import { FolderType } from "@/types/folder-type";
import { useGetArchiveFolders } from "@/query/folder/api/use-get-archive-folder";

import { Trash2, Undo2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useUnArchiveFolder } from "@/query/folder/api/use-unarchive-folder";
import { useOpenDeleteModel } from "@/hooks/folder/use-open";

export const TrashFolderItems = () => {
  const router = useRouter();

  const { onOpen } = useOpenDeleteModel();

  const { data, isLoading } = useGetArchiveFolders();
  const unarchiveMutation = useUnArchiveFolder();

  const handleUnArchive = (folderId: string, parentFolderId: string) => {
    unarchiveMutation.mutate({ folderId, parentFolderId });
  };

  return (
    <>
      <h2 className="text-2xl font-semibold ms-1 mb-4">Deleted Folders</h2>
      {isLoading ? (
        <div className="flex justify-center items-center my-20">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          {data?.length === 0 ? (
            <p className="w-full h-[calc(100vh-70vh)] flex items-center justify-center text-neutral-400">
              No Folders are in Trash
            </p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-5">
              {data?.map((data: FolderType) => (
                <div
                  key={data.id}
                  className="relative mr-5 ml-16 md:ml-5 group max-w-32 mt-2"
                  role="button"
                >
                  <Image
                    src={"/folder.png"}
                    alt=""
                    width={100}
                    height={100}
                    onClick={() => router.push(`/dashboard/folder/${data.id}`)}
                  />
                  <p className="text-sm font-semibold truncate">{data.name}</p>
                  <div className="absolute -top-4 -right-10 z-50 flex gap-x-3 opacity-0 group-hover:opacity-100">
                    {unarchiveMutation.isPending ? (
                      <Spinner size={"lg"} />
                    ) : (
                      <div
                        className="p-1 hover:bg-primary/30 rounded-md opacity-0 group-hover:opacity-100"
                        role="button"
                      >
                        <Undo2
                          className="size-4"
                          onClick={() =>
                            handleUnArchive(data.id, data.parentFolderId)
                          }
                        />
                      </div>
                    )}
                    <div
                      className="p-1 hover:bg-primary/30 rounded-md opacity-0 group-hover:opacity-100"
                      role="button"
                      onClick={() => onOpen(data.id)}
                    >
                      <Trash2 className="size-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};
