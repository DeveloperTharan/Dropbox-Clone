"use client";

import React from "react";
import TableWrapper from "./TableWrapper";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default function FilesList() {
  const params = useParams();
  const { userId } = useAuth();

  const Files = useQuery(api.file.getFiles, {
    userID: userId! as string,
    parentFolder: params.folderId as Id<"Folder">,
  });

  return (
    <>
      <h1 className="text-lg font-semibold">All Files</h1>
      <div className="mt-12 mb-20">
        <TableWrapper fileslist={Files} />
      </div>
    </>
  );
}
