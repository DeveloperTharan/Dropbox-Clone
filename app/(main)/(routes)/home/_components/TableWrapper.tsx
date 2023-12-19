"use client";

import React from "react";
import { FileType } from "@/constants/file-constant";
import { Doc, Id } from "@/convex/_generated/dataModel";
import prettyBytes from "pretty-bytes";
import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";

interface FileData {
  _id: Id<"File">;
  _creationTime: number;
  userID: string;
  name: string;
  url: string;
  size: number;
  isArchived: boolean;
  isFavorite: boolean;
  isSigned: boolean;
  type: string;
}

export default function TableWrapper({
  fileslist,
}: {
  fileslist?: Doc<"File"> | FileData[];
}) {
  const fileList = fileslist as FileData[];

  return (
    <>
      <div className="shadow-[8px] sm:rounded-[10px] border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>FileName</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-center">Size</TableHead>
              <TableHead className="text-center">Link</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fileList === undefined ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : (
              <>
                {fileList?.length === 0 ? (
                  <TableCaption className="flex text-center items-center justify-center">
                    No files are there!
                  </TableCaption>
                ) : (
                  <>
                    {fileList?.map((file) => {
                      const type = file?.type as string;
                      const extension: string = type.split("/")[1];

                      return (
                        <TableRow
                          className="border-b last:border-0"
                          key={file?._id}
                        >
                          <TableCell>
                            <div className="h-6 w-6">
                              <FileIcon
                                extension={extension}
                                labelColor={FileColorExtension[extension]}
                                //@ts-ignore
                                {...defaultStyles[extension]}
                              />
                            </div>
                          </TableCell>
                          <TableCell>{file?.name}</TableCell>
                          <TableCell>{file?._creationTime}</TableCell>
                          <TableCell className="text-center">
                            {prettyBytes(file?.size as number)}
                          </TableCell>
                          <TableCell className="text-center">
                            <Link
                              href={file?.url}
                              target="_blank"
                              className="text-blue-500 h0ver:text-blue-600 underline"
                            >
                              Link
                            </Link>
                          </TableCell>
                          <TableCell className="text-right">menu</TableCell>
                        </TableRow>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
      {fileList?.length > 0 && (
        <TableCaption className="flex text-center items-center justify-center">
          A list of your Files.
        </TableCaption>
      )}
    </>
  );
}
