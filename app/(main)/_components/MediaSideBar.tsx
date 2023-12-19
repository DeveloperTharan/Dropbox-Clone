"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { menu } from "@/constants/menu-constant";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { ChevronRight, Folder, FolderOpen, Plus } from "lucide-react";
import FolderList from "./FolderList";

export default function MediaSideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [Open, setOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const { userId } = useAuth();

  const createFolder = useMutation(api.file.creatrFolder);

  const handleCreateFolder = () => {
    const promise = createFolder({
      name: "Doc",
      userID: userId!,
    });

    toast.promise(promise, {
      loading: "Creating folder...",
      success: "Successfully Created!",
      error: "Error! try again.",
      duration: 2000
    })
  }

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
                    <div className="flex flex-col gap-y-4" key={menu.id}>
                      <Link href={menu.href}>
                        <div
                          className={`flex gap-x-3 justify-start items-center pl-5 py-[10px] w-full
                        hover:bg-neutral-200 dark:hover:bg-gray-800 ${
                          active ? "bg-neutral-200 dark:bg-gray-800" : ""
                        }`}
                        >
                          <div className="h-[14px] w-[14px] font-light">{menu.Icon}</div>
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
                    ${Open && 'rotate-90 transition duration-300 ease-in-out'}`}
                    onClick={() => setOpen(!Open)} 
                  />
                </div>
                <div className="text-[12px] font-light">
                  {!Open ? <Folder className="h-4 w-4" /> : <FolderOpen className="h-4 w-4" />}
                </div>
                <div className="text-[13px]">Folders</div>
                <div className="text-[12px] font-light ml-auto mr-2">
                  <Plus
                    className="h-4 w-4 p-[2px] hover:bg-background rounded-[5px] cursor-pointer opacity-0 
                    group-hover:opacity-100 transition delay-300 ease-in-out"
                    onClick={handleCreateFolder}
                  />
                </div>
              </div>
            </div>
          </div>
          {Open === true && <FolderList/>}
        </section>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
