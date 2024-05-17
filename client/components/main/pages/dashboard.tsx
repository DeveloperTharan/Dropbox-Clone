import React from "react";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { getJwt } from "@/utils/get-jwt";
import { FileType } from "@/types/file-type";
import { getUserId } from "@/utils/get-user-id";
import { defaultStyles, FileIcon } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";

import { card } from "@/constants/dashboard-card";
import { Card, CardContent } from "@/components/ui/card";
import { CreateFolderModel } from "@/components/models/folder-create";

import { Plus } from "lucide-react";
import { formatDate } from "@/utils/formate-date";

const apiBaseUrl = process.env.API_BASE_URL!;

export const Dashboard = async () => {
  const userId = getUserId();

  if (!userId) return null;

  const files = await axios.get(
    `${apiBaseUrl}/file/get_all_files?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    }
  );

  return (
    <div className="w-full h-auto">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="w-full flex items-center justify-between my-7">
        <h2 className="text-xl font-semibold">My Files</h2>
        <CreateFolderModel userId={userId}>
          <div
            className="px-4 py-2 rounded-xl text-white bg-blue-600 flex items-center justify-center gap-x-1"
            role="button"
          >
            <Plus size={15} />
            <span className="text-xs">Add New</span>
          </div>
        </CreateFolderModel>
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
        {!files.data && <p>Loading...</p>}
        {files.data.length! === 0 && (
          <Card>
            <CardContent className="flex items-center justify-between p-4">
              No Recent Files
            </CardContent>
          </Card>
        )}
        {files.data?.map((file: FileType) => {
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
  );
};
