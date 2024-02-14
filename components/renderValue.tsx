"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import Link from "next/link";
import { FileColorExtension } from "@/constants/color-constant";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Folder } from "lucide-react";
import { redirect } from "next/navigation";

interface RenderValueProps {
  searchDocument: string;
  activeButton: string;
}

export default function RenderValue({
  searchDocument,
  activeButton,
}: RenderValueProps) {
  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const router = useRouter();
  const files = useQuery(api.file.getSearchFile, { userID: userId! as string });
  const folders = useQuery(api.file.getSearchFolder, {
    userID: userId as string,
  });

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const onRedirect = (folderId: string) => {
    router.push(`/home/${folderId}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return formattedDate;
  };

  const renderResults = () => {
    if (activeButton === "files") {
      return (
        <>
          {files?.length === 0 ? (
            <p></p>
          ) : (
            <>
              {files
                ?.filter((item) => {
                  return (
                    searchDocument.toLowerCase() === "" ||
                    item.name.toLowerCase().includes(searchDocument)
                  );
                })
                .map((item) => {
                  const type = item?.type as string;
                  const extension: string = type.split("/")[1];

                  return (
                    <Link
                      href={item?.url}
                      target="_blank"
                      key={item?._id}
                      className="flex justify-normal items-center gap-x-4 hover:bg-gray-200 
                    dark:hover:bg-gray-800 w-full my-2 p-2 rounded-[4px] cursor-pointer"
                    >
                      <div className="h-4 w-4">
                        <FileIcon
                          extension={extension}
                          labelColor={FileColorExtension[extension]}
                          //@ts-ignore
                          {...defaultStyles[extension]}
                        />
                      </div>
                      <h1 className="text-sm font-normal">
                        {truncate(`${item?.name}`, 25)}
                      </h1>
                      <div className="ml-auto">
                        {item ? formatDate(item._creationTime) : "-"}
                      </div>
                    </Link>
                  );
                })}
            </>
          )}
        </>
      );
    } else if (activeButton === "folders") {
      return (
        <>
          {folders?.length === 0 ? (
            <p className="flex justify-center items-center mx-auto">
              No Folder found!
            </p>
          ) : (
            <>
              {folders
                ?.filter((item) => {
                  return (
                    searchDocument.toLowerCase() === "" ||
                    item.name.toLowerCase().includes(searchDocument)
                  );
                })
                .map((item) => {
                  return (
                    <div
                      key={item?._id}
                      className="flex justify-normal items-center gap-x-4 hover:bg-gray-200 
                    dark:hover:bg-gray-800 w-full my-2 p-2 rounded-[4px] cursor-pointer"
                      onClick={() => onRedirect(item?._id)}
                    >
                      <Folder className="w-4 h-4" />
                      <h1 className="text-sm font-normal">{item?.name}</h1>
                      <div className="ml-auto">
                        {item ? formatDate(item._creationTime) : "-"}
                      </div>
                    </div>
                  );
                })}
            </>
          )}
        </>
      );
    }
    return null;
  };

  return <div className="w-full mt-5">{renderResults()}</div>;
}
