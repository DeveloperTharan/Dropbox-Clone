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
import {
  ChevronRight,
  Club,
  Cylinder,
  ImageDown,
  PencilLine,
  Plus,
  Trash,
  Waypoints,
} from "lucide-react";
import { usePathname } from "next/navigation";
import FolderList from "./FolderList";

export default function MediaSideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [Open, setOpen] = useState<boolean>(false);

  const menu = [
    {
      id: 1,
      name: "All Files",
      href: "/home",
      Icon: <Cylinder className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 2,
      name: "Photos",
      href: "/photos",
      Icon: <ImageDown className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 3,
      name: "Shared",
      href: "/shared",
      Icon: <Waypoints className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 4,
      name: "Signatured",
      href: "/signatured",
      Icon: <PencilLine className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 5,
      name: "Deleted",
      href: "/deleted",
      Icon: <Trash className="h-[14px] w-[14px] font-light" />,
    },
  ];

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
                          <div className="text-[12px] font-light">
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
          <div className="flex flex-col gap-y-4">
            <div
              className="flex gap-x-3 justify-between items-center pl-5 py-[10px] w-full
              hover:bg-neutral-200 dark:hover:bg-gray-800 cursor-pointer group"
              onClick={() => setOpen(!Open)}
            >
              <div className="flex gap-x-3 justify-start items-center">
                <div className="text-[12px] font-light">
                  <ChevronRight className={`h-[14px] w-[14px] font-light ${Open && "rotate-90"}`} />
                </div>
                <div className="text-[13px]">Folders</div>
              </div>
              <div 
                className="opacity-0 group-hover:opacity-100 mr-4 transition duration-300 hover:bg-background
                p-1 rounded-[5px]">
                <Plus className="h-[14px] w-[14px] font-light" />
              </div>
            </div>
          </div>
          {Open ? <FolderList /> : null}
        </section>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
