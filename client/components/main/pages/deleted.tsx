import React from "react";

import axios from "axios";
import { getJwt } from "@/utils/get-jwt";
import { getUserId } from "@/utils/get-user-id";

import { TrashFileItems } from "./_components/trash-file-item";
import { TrashFolderItems } from "./_components/trash-folder-item";

const apiBaseUrl = process.env.API_BASE_URL;

export const Deleted = async () => {
  const userId = getUserId();
  if (!userId) return null;

  const file = await axios.get(
    `${apiBaseUrl}/file/archive_files?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    }
  );
  const folder = await axios.get(
    `${apiBaseUrl}/folder/archive_folders?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    }
  );

  return (
    <div className="flex flex-col">
      <TrashFileItems files={file.data} />
      <div className="my-8 border-b" />
      <TrashFolderItems folders={folder.data} />
    </div>
  );
};
