"use client";

import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import TrashFileMenu from "./TrashFileMenu";
import { redirect } from "next/navigation";

export default function TrashFileItems() {
  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const getTrash = useQuery(api.file.getAchive, { userID: userId as string });

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <>
      <h2 className="text-2xl font-semibold ms-1 mb-4">Deleted Files</h2>
      {getTrash === undefined ? (
        <div className="flex justify-center items-center my-20">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current 
            border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {getTrash.length === 0 ? (
            <p className="flex justify-center items-center my-20">
              No Files are in Trash
            </p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-5">
              {getTrash?.map((file) => {
                const type = file?.type;
                const extension = type.split("/")[1];

                return (
                  <Card
                    className="w-full h-full max-w-fit max-h-fit border-0 group"
                    key={file?._id}
                  >
                    <CardHeader className="flex flex-col justify-center items-center p-2">
                      <TrashFileMenu id={file?._id}>
                        <MoreHorizontal
                          className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-gray-200 
                  dark:hover:bg-black p-1 rounded-[5px]"
                        />
                      </TrashFileMenu>
                      <Link
                        href={file?.url}
                        target="_blank"
                        className="flex flex-col gap-y-4 justify-center items-center p-2"
                      >
                        <CardTitle className="h-12 w-12">
                          <FileIcon
                            extension={extension}
                            labelColor={FileColorExtension[extension]}
                            //@ts-ignore
                            {...defaultStyles[extension]}
                          />
                        </CardTitle>
                        <CardDescription>
                          {truncate(`${file?.name}`, 12)}
                        </CardDescription>
                      </Link>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          )}
        </>
      )}
    </>
  );
}
