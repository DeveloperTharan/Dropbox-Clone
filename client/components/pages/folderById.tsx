"use client";

import React from "react";
import { Dropzone } from "../drop-zone";
import { useGetFilesByFolderId } from "@/query/file/api/use-get-files-by-folderId";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";
import { Skeleton } from "../ui/skeleton";
import { useArchiveFile } from "@/query/file/api/use-archive-file";

export const FolderById = ({ Id }: { Id: string }) => {
  const { data, isLoading } = useGetFilesByFolderId(Id);
  const archiveMutation = useArchiveFile(Id);

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Skeleton className="w-full h-[225px] rounded-md" />
        <div className="mt-16 w-full flex flex-col gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton className="w-full h-10 rounded-md" key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-auto pb-20">
      <Dropzone folderId={Id} />
      <hr className="w-full h-full bg-neutral-400 my-10" />
      <div className="w-full flex items-end justify-between my-4">
        <h1 className="text-3xl font-semibold">Files</h1>
        <p className="text-xs text-neutral-600">Only you can access</p>
      </div>
      <DataTable
        columns={columns}
        data={data ?? []}
        onDelete={(row) => {
          const rows = row.map((r) => r.original.id);
          rows.forEach((id) => {
            archiveMutation.mutate({ id });
          });
        }}
        disabled={archiveMutation.isPending}
      />
    </div>
  );
};
