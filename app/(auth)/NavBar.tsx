import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="w-full h-auto max-h-fit fixed top-0 left-0 z-50 bg-background shadow-md">
      <div
        className='flex items-center shadow p-0'
      >
        <div className="flex flex-row justify-start items-start mr-auto">
          <Link href={"/"} className="flex justify-center items-center gap-x-2">
            <Image src="/logo.svg" alt="/logo" width={66} height={66} />
            <h1 className="text-lg font-bold text-base-content">Dropbox</h1>
          </Link>
        </div>
      </div>
    </div>
  );
}
