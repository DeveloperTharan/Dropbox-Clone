"use client";

import React from "react";
import Link from "next/link";

import { FileType } from "@/types/file-type";
import { Spinner } from "@/components/ui/spinner";
import { defaultStyles, FileIcon } from "react-file-icon";
import { categorizeFiles } from "@/utils/categorize-file";
import { FileColorExtension } from "@/constants/color-constant";
import { useGetAllFiles } from "@/query/file/api/use-get-all-files";

export const Unknown = () => {
  const { data, isLoading } = useGetAllFiles();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Spinner size={"lg"} />
      </div>
    );

  const { categories } = categorizeFiles(data ?? data);

  return (
    <>
      {categories?.unknown?.length === 0 ? (
        <p className="w-full h-[calc(100vh-50vh)] flex items-center justify-center text-neutral-400">
          No files are in unknown.
        </p>
      ) : (
        <div className="flex  flex-row flex-wrap justify-normal items-center gap-5 my-4">
          {categories?.unknown?.map((file: FileType) => {
            const type = file?.fileType;
            const extension = type.split("/")[1];
            return (
              <div
                className="border-0 group flex flex-col justify-center items-center relative"
                key={file?.id}
              >
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
  );
};
