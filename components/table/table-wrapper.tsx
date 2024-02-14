'use client'

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { redirect } from "next/navigation";

export type FileType = {
    id: string;
    timestamp: number;
    userID: string;
    filename: string;
    downloadURL: string;
    size: number;
    isArchived: boolean;
    isFavorite: boolean;
    type: string;
  }
  

function TableWrapper() {
    const params = useParams();
    const { userId } = useAuth();

    if(!userId){
      redirect("/sign-in");
    }
  
    const Files = useQuery(api.file.getFiles, {
      userID: userId as string,
      parentFolder: params.folderId as Id<"Folder">,
    });
  
    const skeletonFiles: FileType[] | undefined = Files
      ? Files.map((file) => ({
          id: file._id,
          timestamp: file._creationTime,
          userID: file.userID,
          filename: file.name,
          downloadURL: file.url,
          size: file.size,
          isArchived: file.isArchived,
          isFavorite: file.isFavorite,
          type: file.type,
        }))
      : undefined;
  
    return (
      <div>
        <DataTable columns={columns} data={skeletonFiles || []} />
      </div>
    );
  }
  
  export default TableWrapper;