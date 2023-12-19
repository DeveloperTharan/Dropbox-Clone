"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { ChevronRight, Folder, FolderOpen, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

interface FolderProps {
  parentFolderId?: Id<"Folder">;
  level?: number;
}

export default function FolderList({ parentFolderId, level = 0 }: FolderProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const params = useParams();
  const router = useRouter();
  const { userId } = useAuth();

  const onExpand = (folderId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [folderId]: !prevExpanded[folderId],
    }));
  };

  const onRedirect = (folderId: string) => {
    router.push(`/home/${folderId}`);
  };

  const getFolders = useQuery(api.file.getFolders, {
    userID: userId! as string,
    parentFolder: parentFolderId as Id<"Folder">,
  });

  function ItemSkeleton({ level }: { level?: number }) {
    return (
      <div
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : "12px",
        }}
        className="flex gap-x-2 py-[3px] items-center"
      >
        <Skeleton className="h-[12px] w-4" />
        <Skeleton className="h-[12px] w-[70%]" />
      </div>
    );
  }

  return (
    <>
      {getFolders === undefined ? (
        <>
          <ItemSkeleton level={level} />
          {level === 0 && (
            <>
              <ItemSkeleton level={level} />
              <ItemSkeleton level={level} />
            </>
          )}
        </>
      ) : (
        <>
          {level === 0 ? (
            <p
              style={{
                paddingLeft: level ? `${level * 12 + 25}px` : undefined,
              }}
              className={`hidden text-[12px] mx-auto font-medium text-gray-600
              ${expanded && "last:block"} `}
            >
              No Folders inside
            </p>
          ) : (
            <>
              {level === 0 ? null : (
                <p
                  style={{
                    paddingLeft: level ? `${level * 12 + 25}px` : undefined,
                  }}
                  className={`hidden text-[12px] mx-auto font-medium text-gray-600
                ${expanded && "last:block"} `}
                >
                  No Folders inside
                </p>
              )}
            </>
          )}
          {getFolders?.map((folder) => {
            const active = params.folderId === folder._id;

            return (
              <div
                className="flex flex-col"
                key={folder?._id}
                role="button"
                onClick={() => onRedirect(folder?._id)}
              >
                <div
                  className={`flex gap-x-3 justify-start items-center pl-12 py-[10px] w-full
                hover:bg-neutral-200 dark:hover:bg-gray-800 group ${
                  active ? "bg-neutral-200 dark:bg-gray-800" : ""
                }`}
                  style={{
                    paddingLeft: level ? `${level * 12 + 12}px` : "12px",
                  }}
                >
                  <div className="text-[12px] font-light">
                    <ChevronRight
                      className={`h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer 
                      ${expanded[folder?._id] ? "rotate-90" : "rotate-0"}`}
                      onClick={() => onExpand(folder?._id)}
                    />
                  </div>
                  <div className="text-[12px] font-light">
                    {!expanded[folder?._id] ? (
                      <Folder className="h-4 w-4" />
                    ) : (
                      <FolderOpen className="h-4 w-4" />
                    )}
                  </div>
                  <div className="text-[13px]">{folder?.name}</div>
                </div>
                {expanded[folder._id] && (
                  <FolderList parentFolderId={folder._id} level={level + 1} />
                )}
              </div>
            );
          })}
        </>
      )}
    </>
  );
}
