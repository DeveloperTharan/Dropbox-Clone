"use client";

import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ImageFilter() {
  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const getFiles = useQuery(api.file.getFiles, { userID: userId as string });

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <>
      <h1 className="text-xl font-semibold">Your Photo Files</h1>
      {getFiles === undefined ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current 
            border-t-transparent text-blue-600 rounded-full dark:text-blue-500 mt-[20%]"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {getFiles.length === 0 ? (
            <p className="relative h-full flex justify-center items-center mt-[20%]">
              No Photo files found!
            </p>
          ) : (
            <div className="flex flex-row flex-wrap justify-normal items-center gap-5">
              {getFiles
                ?.filter((file) => file?.type.startsWith("image/"))
                ?.map((file) => {
                  const type = file?.type;
                  const extension = type.split("/")[1];

                  return (
                    <Card
                      className="w-full h-full max-w-fit max-h-fit border-0 group"
                      key={file?._id}
                    >
                      <CardHeader className="flex flex-col justify-center items-center p-2">
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
