"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { FolderType } from "@/types/folder-type";
import { Skeleton } from "@/components/ui/skeleton";

import { Ellipsis } from "lucide-react";
import { FolderMenu } from "./_components/folder-menu";

export const Home = ({ folder }: { folder: FolderType[] | undefined }) => {
  const router = useRouter();
  return (
    <div className="flex items-start justify-start gap-5 flex-wrap mx-auto">
      {!folder &&
        Array.from({ length: 15 }).map((_, index) => (
          <Skeleton key={index} className="min-w-52 h-52 rounded-lg flex-1" />
        ))}
      {folder?.length! === 0 && (
        <p className="w-full h-[calc(100vh-20vh)] flex items-center justify-center text-neutral-400">
          No folders
        </p>
      )}
      {folder?.map((data, _) => (
        <div
          key={data.id}
          className="relative mr-5 ml-16 md:ml-5 group max-w-32"
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
          <div className="absolute -top-2 -right-2 z-50">
            <FolderMenu
              folderId={data.id}
              foldername={data.name}
              userId={data.userId}
            >
              <Ellipsis
                size={20}
                role="button"
                className="opacity-0 group-hover:opacity-100"
              />
            </FolderMenu>
          </div>
        </div>
      ))}
    </div>
  );
};
