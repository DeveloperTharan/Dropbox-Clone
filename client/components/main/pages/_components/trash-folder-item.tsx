"use client";

import Image from "next/image";
import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { FolderType } from "@/types/folder-type";
import { UnArchiveFolder } from "@/action/folder";

import { Trash2, Undo2 } from "lucide-react";
import { Spinner } from "../../../ui/spinner";
import { FolderDeleteModel } from "../../../models/folder-delete";

export const TrashFolderItems = ({ folders }: { folders: FolderType[] }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleUnArchive = (
    folderId: string,
    userId: string,
    parentFolderId: string
  ) => {
    startTransition(() => {
      UnArchiveFolder(folderId, userId, parentFolderId)
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
      <h2 className="text-2xl font-semibold ms-1 mb-4">Deleted Folders</h2>
      {!folders ? (
        <div className="flex justify-center items-center my-20">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          {folders.length === 0 ? (
            <p className="w-full h-[calc(100vh-50vh)] flex items-center justify-center text-neutral-400">
              No Folders are in Trash
            </p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-5">
              {folders?.map((data) => (
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
                    {isPending ? (
                      <Spinner size={"lg"} />
                    ) : (
                      <div className="w-full">
                        <Undo2
                          className="w-6 h-6 hover:bg-primary/30 p-1 rounded-lg shadow-lg"
                          role="button"
                          onClick={() =>
                            handleUnArchive(
                              data.id,
                              data.userId,
                              data.parentFolderId
                            )
                          }
                        />
                      </div>
                    )}
                    <FolderDeleteModel
                      folderId={data.id}
                      userId={data.userId}
                      foldername={data.name}
                    >
                      <Trash2
                        className="w-6 h-6 hover:bg-primary/30 p-1 rounded-lg shadow-lg"
                        role="button"
                      />
                    </FolderDeleteModel>
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
