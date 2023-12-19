"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Folder, FolderOpen, Plus } from "lucide-react";
import FolderList from "./FolderList";
import { menu } from "@/constants/menu-constant";
import CreateFolder from "@/components/createfolder-model";

export default function SideBar() {
  const [Open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();

  return (
    <div
      className="fixed flex h-full flex-row gap-4 overflow-y-auto w-0 md:w-60 md:border-r-[1px]
      md:border-gray-300/80 md:dark:border-gray-800 z-50"
    >
      <aside className="w-full bg-background justify-start">
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
        <section className="flex flex-col gap-y-4 mt-3 border-b-[1px] dark:border-gray-800">
          <div className="flex flex-col pb-3 dark:border-gray-800">
            {menu.map((menu) => {
              let active = pathname === menu.href;

              return (
                <div className="flex flex-col gap-y-4" key={menu.id}>
                  <Link href={menu.href}>
                    <div
                      className={`flex gap-x-3 justify-start items-center pl-5 py-[10px] w-full
                      hover:bg-neutral-200 dark:hover:bg-gray-800 ${
                        active ? "bg-neutral-200 dark:bg-gray-800" : ""
                      }`}
                    >
                      <div className="h-[14px] w-[14px] font-light">
                        {menu.Icon}
                      </div>
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
                <CreateFolder>
                  <div className="text-[12px] font-light ml-auto mr-2">
                    <Plus
                      className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
                      group-hover:opacity-100 transition delay-300 ease-in-out"
                    />
                  </div>
                </CreateFolder>
              </div>
            </div>
          </div>
          {Open === true && <FolderList />}
        </section>
      </aside>
    </div>
  );
}
