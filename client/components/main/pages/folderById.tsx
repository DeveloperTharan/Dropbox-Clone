import React from "react";

import axios from "axios";
import { getJwt } from "@/utils/get-jwt";
import { getUserId } from "@/utils/get-user-id";
import { Dropzone } from "./_components/drop-zone";
import { DataTable } from "../table/data-table";
import { columns } from "../table/columns";

const apiBaseUrl = process.env.API_BASE_URL!;

export const FolderById = async ({ Id }: { Id: string }) => {
  const userId = getUserId();

  if (!userId) return null;

  const file = await axios.get(`${apiBaseUrl}/file/get?folderId=${Id}`, {
    headers: {
      Authorization: `Bearer ${await getJwt(userId)}`,
    },
  });

  return (
    <div className="w-full h-auto pb-20">
      <Dropzone folderId={Id} />
      <hr className="w-full h-full bg-neutral-400 my-10" />
      <div className="w-full flex items-end justify-between my-4">
        <h1 className="text-3xl font-semibold">Files</h1>
        <p className="text-xs text-neutral-600">Only you can access</p>
      </div>
      <DataTable columns={columns} data={file.data} />
    </div>
  );
};
