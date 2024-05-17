"use client";

import Image from "next/image";
import React, { useState } from "react";
import { redirect } from "next/navigation";

import { cn } from "@/lib/utils";
import { ModeToggler } from "@/components/ui/mode-toggler";

import { AlignJustify, Globe } from "lucide-react";
import Link from "next/link";

export const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full h-auto max-h-fit fixed top-0 left-0 z-50 bg-white dark:bg-black">
      <div
        className={cn(`flex items-center shadow p-0,
        ${open} && shadow-none`)}
      >
        <div className="flex flex-row justify-start items-start mr-auto">
          <div className="flex justify-center items-center gap-x-2">
            <Image src="/logo.svg" alt="/logo" width={66} height={66} />
            <h1 className="text-lg font-bold text-base-content">Dropbox</h1>
          </div>
          <div className="xl:hidden ml-5 my-auto">
            <ModeToggler />
          </div>
          <div className="hidden xl:block">
            <div className="ml-5 flex items-center justify-center">
              <a
                href="#"
                className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                Why Dropbox?
              </a>
              <a
                href="#"
                className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                Product
              </a>
              <a
                href="#"
                className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                Solution
              </a>
              <a
                href="#"
                className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                pricing
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end items-end ml-auto">
          <div className="hidden xl:block mb-1">
            <ModeToggler />
          </div>
          <div className="hidden xl:block">
            <div className="flex justify-center items-center">
              <a
                href="#"
                className=" px-2 py-[14px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                <Globe className="h-4 w-4 text-gray-500" />
              </a>
              <a
                href="#"
                className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                Contat
              </a>
              <a
                href="#"
                className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
              >
                Get app
              </a>
            </div>
          </div>
          <Link href={"/auth/sign-up"}>
            <button className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none">
              Sign up
            </button>
          </Link>
          <Link href={"/auth/sign-in"}>
            <button className=" px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none">
              Login
            </button>
          </Link>
          <div className="hidden md:block">
            <div className="flex justify-center items-center">
              <Link href={"/auth/sign-up"}>
                <button className=" px-3 py-[6px] bg-blue-700 text-white rounded-none me-2 mb-1">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div
            className="xl:hidden my-auto px-2 py-[10px] hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-none"
            role="button"
            onClick={() => setOpen(!open)}
          >
            <AlignJustify />
          </div>
        </div>
      </div>
      <div className="xl:hidden">
        {open ? (
          <div className="absolute left-0 top-[44px] w-full bg-white dark:bg-black h-[100vh] pb-20 px-3 z-50">
            <div className="pb-5 border-b-[1px] border-bg-neutral-200">
              <div
                role="button"
                className="my-2 font-semibold text-lg py-2 px-5 hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-sm"
              >
                Why Dropbox?
              </div>
              <div
                role="button"
                className="my-2 font-semibold text-lg py-2 px-5 hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-sm"
              >
                Product
              </div>
              <div
                role="button"
                className="my-2 font-semibold text-lg py-2 px-5 hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-sm"
              >
                Solution
              </div>
              <div
                role="button"
                className="my-2 font-semibold text-lg py-2 px-5 hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-sm"
              >
                pricing
              </div>
              <div
                role="button"
                className="my-2 font-semibold text-lg py-2 px-5 hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-sm"
              >
                Contact
              </div>
              <div
                role="button"
                className="my-2 font-semibold text-lg py-2 px-5 hover:bg-neutral-200 dark:hover:bg-gray-800 rounded-sm"
              >
                Get app
              </div>
            </div>
            <div className="md:hidden">
              <div className="flex items-end">
                <Link href={"/auth/sign-up"} className="w-full">
                  <button className=" py-3 bg-blue-700 text-white rounded-none w-full text-xl mt-4">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
