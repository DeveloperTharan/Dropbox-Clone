"use client";

import React from "react";
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
  Trash,
  Waypoints,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function MediaSideBar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      name: "All Files",
      href: "/home",
      Icon: <Cylinder className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 2,
      name: "Uplode",
      href: "/uplode",
      Icon: <Club className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 3,
      name: "Photos",
      href: "/photos",
      Icon: <ImageDown className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 4,
      name: "Shared",
      href: "/shared",
      Icon: <Waypoints className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 5,
      name: "Signatured",
      href: "/signatured",
      Icon: <PencilLine className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 6,
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
            <section className="flex flex-col gap-y-4 mt-3">
              <div className="flex flex-col pb-3 dark:border-gray-800">
                {menu.map((menu) => {
                  let active = pathname === menu.href;

                  return (
                    <div className="flex flex-col gap-y-4" key={menu.id}>
                      <Link href={menu.href}>
                        <div
                          className={`flex gap-x-3 justify-start items-center pl-5 py-[10px] w-full hover:bg-neutral-200
                    dark:hover:bg-gray-800 ${
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
