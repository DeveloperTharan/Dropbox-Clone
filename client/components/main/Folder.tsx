"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Item from "./item";
import { Skeleton } from "../ui/skeleton";
import { FolderNode } from "@/utils/structure-data";

interface FolderListProps {
  parentFolderId?: string;
  level?: number;
  folder: FolderNode[] | undefined;
}

export const FolderList = ({
  folder,
  level = 0,
  parentFolderId,
}: FolderListProps) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const params = useParams();
  const router = useRouter();

  const onExpand = (folderId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [folderId]: !prevExpanded[folderId],
    }));
  };

  return (
    <>
      {!folder ? (
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
          {folder?.map((folder) => (
            <div key={folder.id}>
              <Item
                id={folder.id}
                name={folder.name}
                onClick={() => router.push(`/dashboard/folder/${folder.id}`)}
                label={folder.name}
                active={params.folderId === folder.id}
                level={level}
                onExpand={() => onExpand(folder.id)}
                expanded={expanded[folder.id]}
                userId={folder.userId}
              />
              {expanded[folder.id] && (
                <FolderList
                  parentFolderId={folder.id}
                  level={level + 1}
                  folder={folder.children}
                />
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

const ItemSkeleton = ({ level }: { level?: number }) => {
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
};
