"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Item from "./Item";

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
          {getFolders?.map((folder) => (
            <div key={folder._id}>
            <Item
              id={folder._id}
              onClick={() => onRedirect(folder._id)}
              label={folder.name}
              active={params.folderId === folder._id}
              level={level}
              onExpand={() => onExpand(folder._id)}
              expanded={expanded[folder._id]}
            />
            {expanded[folder._id] && (
              <FolderList
                parentFolderId={folder._id}
                level={level + 1}
              />
            )}
          </div>
          ))}
        </>
      )}
    </>
  );
}
