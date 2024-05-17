import React from "react";
import Link from "next/link";

import { FileType } from "@/types/file-type";
import { Spinner } from "@/components/ui/spinner";
import { defaultStyles, FileIcon } from "react-file-icon";
import { categorizeFiles } from "@/utils/categorize-files";
import { FileColorExtension } from "@/constants/color-constant";

export const Documents = ({ files }: { files: FileType[] | undefined }) => {
  if (!files)
    return (
      <div className="flex justify-center items-center my-20">
        <Spinner size={"lg"} />
      </div>
    );

  const { categories } = categorizeFiles(files);

  return (
    <>
      {categories.documents?.length === 0 ? (
        <p className="w-full h-[calc(100vh-50vh)] flex items-center justify-center text-neutral-400">
          No files are in Documents
        </p>
      ) : (
        <div className="flex  flex-row flex-wrap justify-normal items-center gap-5 my-4">
          {categories.documents?.map((file) => {
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
