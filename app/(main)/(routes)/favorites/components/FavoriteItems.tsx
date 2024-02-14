"use client";

import React from "react";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";
import { StarOffIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function FavoriteItems() {
  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const getFavorite = useQuery(api.file.getFavorite, {
    userID: userId as string,
  });
  const update = useMutation(api.file.update);

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const handleRemoveFavorite = (fileId: string) => {
    const promise = update({
      id: fileId as Id<"File">,
      userID: userId as string,
      isFavorite: false,
    });

    toast.promise(promise, {
      loading: "Removing from Favorite",
      success: "Remove from Favorite successfully",
      error: "Error! try again.",
      duration: 2000,
    });
  };

  return (
    <>
      {getFavorite === undefined ? (
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
          {getFavorite.length === 0 ? (
            <p className="relative h-full flex justify-center items-center mt-[20%]">No Favorite Items</p>
          ) : (
            <div className="flex  flex-row flex-wrap justify-normal items-center gap-5">
              {getFavorite?.map((file) => {
                const type = file?.type;
                const extension = type.split("/")[1];

                return (
                  <Card
                    className="w-full h-full max-w-fit max-h-fit border-0 group"
                    key={file?._id}
                  >
                    <CardHeader className="flex flex-col justify-center items-center p-2">
                      <StarOffIcon
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-gray-200 
                dark:hover:bg-black p-1 rounded-[5px]relative top-0 ml-auto text-gray-600"
                        role="button"
                        onClick={() => handleRemoveFavorite(file?._id)}
                      />
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
