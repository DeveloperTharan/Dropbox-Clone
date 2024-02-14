"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { MoreHorizontal } from "lucide-react";
import TrashFolderMenu from "./TrashFolderMenu";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";

export default function TrashFolderItems() {
  const { userId } = useAuth();
  const router = useRouter();

  if(!userId){
    redirect("/sign-in");
  }

  const getTrash = useQuery(api.file.getAchiveFolders, {
    userID: userId as string,
  });

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <>
      <h2 className="text-2xl font-semibold ms-1 mb-4">Deleted Folders</h2>
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
              {getTrash?.map((folder) => (
                <Card
                  className="w-full h-full max-w-fit max-h-fit border-0 group"
                  key={folder?._id}
                  onClick={() => router.push(`/home/${folder?._id}`)}
                >
                  <CardHeader className="flex flex-col justify-center items-center p-2">
                    <TrashFolderMenu id={folder?._id}>
                      <MoreHorizontal
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 hover:bg-gray-200 
                dark:hover:bg-black p-1 rounded-[5px]"
                      />
                    </TrashFolderMenu>
                    <div className="flex flex-col gap-y-4 justify-center items-center p-2">
                      <CardTitle className="h-12 w-12">
                        <Image
                          src="/folder-icon.svg"
                          alt="folder/img"
                          width={55}
                          height={55}
                        />
                      </CardTitle>
                      <CardDescription>
                        {truncate(`${folder?.name}`, 12)}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
