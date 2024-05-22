"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { FileType } from "@/types/file-type";
import { formatDate } from "@/utils/formate-date";
import { defaultStyles, FileIcon } from "react-file-icon";
import { useOpenCreateModel } from "@/hooks/folder/use-open";
import { FileColorExtension } from "@/constants/color-constant";

import { card } from "@/constants/dashboard-card";
import { Card, CardContent } from "@/components/ui/card";

import { Plus } from "lucide-react";
import { useGetAllFiles } from "@/query/file/api/use-get-all-files";
import { Skeleton } from "@/components/ui/skeleton";

export const Dashboard = () => {
  const { onOpen } = useOpenCreateModel();

  const { data, isLoading } = useGetAllFiles();

  const recentFiles = getRecentFiles(data);

  if (isLoading) {
    return (
      <div className="w-full h-auto">
        <Skeleton className="w-44 h-10 rounded-md" />
        <div className="w-full flex flex-wrap items-start justify-center gap-5 mt-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton className="min-w-52 h-52 rounded-md flex-1" key={index} />
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="w-full h-10" key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-auto">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="w-full flex items-center justify-between my-7">
          <h2 className="text-xl font-semibold">My Files</h2>
          <div
            className="px-4 py-2 rounded-xl text-white bg-blue-600 flex items-center justify-center gap-x-1"
            role="button"
            onClick={() => onOpen(null)}
          >
            <Plus size={15} />
            <span className="text-xs">Add New</span>
          </div>
        </div>
        <div className="w-full flex flex-wrap items-start justify-center gap-5">
          {card.map((data) => (
            <Link
              href={data.href}
              key={data.id}
              className="flex-1 min-w-52 shadow-sm shadow-black/20 rounded-lg"
            >
              <Card>
                <CardContent className="pt-7">
                  <Image src={data.image} alt="image" width={50} height={50} />
                  <h1 className="text-xl font-bold pt-1">{data.name}</h1>
                  <p className="pt-2 text-xs text-muted-foreground">
                    {data.desc}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <h2 className="font-semibold text-xl my-7">Recent Orders</h2>
        <div className="w-full h-auto">
          {data?.length! === 0 && (
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                No Recent Files
              </CardContent>
            </Card>
          )}
          {recentFiles?.map((file: FileType) => {
            const type = file?.fileType;
            const extension = type.split("/")[1];
            return (
              <Card className="my-3" key={file.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center justify-center gap-x-4">
                    <div className="h-6 w-6">
                      <FileIcon
                        extension={extension}
                        labelColor={FileColorExtension[extension]}
                        //@ts-ignore
                        {...defaultStyles[extension]}
                      />
                    </div>
                    <h1 className="tex-lg w-32 truncate text-neutral-200">
                      {file.fileName}
                    </h1>
                  </div>
                  <p className="text-sm text-neutral-500">
                    {formatDate(file.createdAt as unknown as number)}
                  </p>
                  <Link
                    href={file.fileURL}
                    target="_blank"
                    className="text-sm text-blue-600 underline"
                  >
                    Link
                  </Link>
                  <h1 className="tex-lg font-extrabold text-neutral-600">
                    {file.fileSize}
                  </h1>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

const getRecentFiles = (files: FileType[]) => {
  if (!files) return [];

  const now = new Date();

  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  return files?.filter((file) => {
    const createdAt = new Date(file.createdAt);
    return createdAt >= sevenDaysAgo;
  });
};
