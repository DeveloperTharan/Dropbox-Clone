"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FolderList } from "./folder";
import { menu } from "@/constants/menu-constant";
import { StructureData } from "@/utils/structure-data";
import { useGetFolders } from "@/query/folder/api/use-get-folders";

import { ChevronRight, Folder, FolderOpen, Plus } from "lucide-react";
import { useOpenCreateModel } from "@/hooks/folder/use-open";

export const SideBar = () => {
  const [Open, setOpen] = useState(false);
  const { onOpen } = useOpenCreateModel();

  const pathname = usePathname();
  const foldersQuery = useGetFolders();

  const structuredData = StructureData(
    foldersQuery?.data ?? foldersQuery?.data
  );

  return (
    <aside className="hidden fixed h-full md:flex flex-col w-0 md:w-60 md:border-r-[1px] md:border-gray-300/80 md:dark:border-gray-800 z-30">
      <section className="items-center px-3 pt-6">
        <Link href={"/dashboard"}>
          <Image
            src="https://www.logo.wine/a/logo/Dropbox_(service)/Dropbox_(service)-Icon-Logo.wine.svg"
            alt="/logo"
            width={50}
            height={50}
          />
        </Link>
      </section>
      <section className="flex flex-col gap-y-4 mt-3 border-b-[1px] dark:border-gray-800">
        <div className="flex flex-col pb-3 dark:border-gray-800">
          {menu.map((menu) => {
            let active = pathname === menu.href;

            return (
              <div
                className={cn(
                  "flex flex-col gap-y-4",
                  active && "bg-secondary"
                )}
                key={menu.id}
              >
                <Link href={menu.href}>
                  <div
                    className={`flex gap-x-3 justify-start items-center pl-5 py-[10px] w-full
                      hover:bg-neutral-200 dark:hover:bg-gray-800 ${
                        active ? "bg-neutral-200 dark:bg-gray-800" : ""
                      }`}
                  >
                    <menu.icon className="h-[14px] w-[14px] font-light" />
                    <div className="text-[13px]">{menu.name}</div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      <section className="flex flex-col mt-3">
        <div className="flex flex-col dark:border-gray-800">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-center justify-between w-full hover:bg-neutral-200 dark:hover:bg-gray-800 group py-[10px] px-1 group">
              <div className="flex gap-x-2">
                <div
                  className="p-1 hover:bg-background rounded-md ml-2"
                  role="button"
                >
                  <ChevronRight
                    className={cn(
                      "size-3",
                      Open && "rotate-90 transition duration-300 ease-in-out"
                    )}
                    onClick={() => setOpen(!Open)}
                  />
                </div>
                <div className="flex items-center justify-center">
                  {!Open ? (
                    <Folder className="size-4 mr-2" />
                  ) : (
                    <FolderOpen className="size-4 mr-2" />
                  )}
                  <div className="text-[13px]">Folders</div>
                </div>
              </div>
              <div
                className="p-1 hover:bg-background rounded-md opacity-0 group-hover:opacity-100"
                role="button"
              >
                <Plus className="size-3" onClick={() => onOpen(null)} />
              </div>
            </div>
          </div>
        </div>
        {Open && (
          <FolderList
            folder={structuredData}
            isPending={foldersQuery.isLoading}
          />
        )}
      </section>
    </aside>
  );
};
