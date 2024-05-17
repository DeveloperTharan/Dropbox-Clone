"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export const NavBar = () => {
  const pathname = usePathname();

  const isSignIn = pathname.endsWith("/sign-in");

  return (
    <div className="w-full h-auto max-h-fit fixed top-0 left-0 z-50 bg-background shadow-md">
      <div className="w-full flex items-center shadow p-0">
        <div className="w-full flex flex-row justify-between items-center mr-auto">
          <Link href={"/"} className="flex justify-center items-center gap-x-2">
            <Image src="/logo.svg" alt="/logo" width={66} height={66} />
            <h1 className="text-lg font-bold text-base-content">Dropbox</h1>
          </Link>
          <Button variant={"ghost"} className="mr-2">
            <Link href={isSignIn ? "/auth/sign-up" : "/auth/sign-in"}>
              {isSignIn ? "SignUp" : "SignIn"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
