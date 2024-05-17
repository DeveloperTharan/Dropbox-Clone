"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

import { toast } from "sonner";
import { menu } from "@/constants/menu-constant";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ChevronRight, Folder, FolderOpen, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { FolderList } from "./Folder";
import { FolderType } from "@/types/folder-type";
import { StructureData } from "@/utils/structure-data";

export const MediaSideBar = ({
  children,
  folder,
}: {
  children: React.ReactNode;
  folder: FolderType[] | undefined;
}) => {
  const [Open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  const structuredFolder = StructureData(folder!);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SheetHeader>
          <SheetTitle>
            <section className="items-center px-3 pt-6">
              <Link href={"/home"}>
                <Image
                  src="https://www.logo.wine/a/logo/Dropbox_(service)/Dropbox_(service)-Icon-Logo.wine.svg"
                  alt="/logo"
                  width={50}
                  height={50}
                />
              </Link>
            </section>
          </SheetTitle>
          <SheetDescription>
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
                  <div
                    className="flex gap-x-3 justify-start items-center pl-5 py-[10px] w-full
                  hover:bg-neutral-200 dark:hover:bg-gray-800 group"
                  >
                    <div className="text-[12px] font-light">
                      <ChevronRight
                        className={`h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer 
                    ${Open && "rotate-90 transition duration-300 ease-in-out"}`}
                        onClick={() => setOpen(!Open)}
                      />
                    </div>
                    <div className="text-[12px] font-light">
                      {!Open ? (
                        <Folder className="h-4 w-4" />
                      ) : (
                        <FolderOpen className="h-4 w-4" />
                      )}
                    </div>
                    <div className="text-[13px]">Folders</div>
                    <div className="text-[12px] font-light ml-auto mr-2">
                      <Plus
                        className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
                        group-hover:opacity-100 transition delay-300 ease-in-out"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {Open === true && <FolderList folder={structuredFolder} />}
            </section>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
