"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { FileType } from "@/types/file-type";
import { HandleFavorite } from "@/action/file";
import { Spinner } from "@/components/ui/spinner";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";

import { StarOffIcon } from "lucide-react";

export default function FavoriteFiles({ files }: { files: FileType[] }) {
  const router = useRouter();
  return (
    <>
      {!files ? (
        <div className="h-[calc(100vh-20vh)] flex flex-col items-center justify-center">
          <Spinner size={"lg"} />
        </div>
      ) : (
        <>
          {files.length === 0 ? (
            <p className="w-full h-[calc(100vh-50vh)] flex items-center justify-center text-neutral-400">
              No Favorite Items
            </p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-2">
              {files.map((file: FileType) => {
                const type = file?.fileType;
                const extension = type.split("/")[1];

                return (
                  <div
                    className="border-0 group flex flex-col justify-center items-center relative"
                    key={file?.id}
                  >
                    <StarOffIcon
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-gray-200 
                        dark:hover:bg-black p-1 rounded-[5px]relative top-0 ml-auto text-gray-600"
                      role="button"
                      onClick={() => {
                        toast.promise(
                          (async () => {
                            HandleFavorite(file.id).finally(() => {
                              router.refresh();
                            });
                          })(),
                          {
                            loading: "Loading...",
                            success: "File unfavorite successfully!",
                            error: "Error unfavorite file",
                          }
                        );
                      }}
                    />
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
}
