"use client";

import React from "react";
import { X } from "lucide-react";
/* import FileType from "./FileType"; */

export default function FilePreview({
  file,
  onRemove,
}: {
  file: any;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-row justify-between items-center px-5 py-3 border-[1px] rounded-xl my-2">
      <div className="flex flex-row justify-start items-center gap-x-4">
        {/* <FileType file={file} /> */}
        <h1 className="text-sm font-semibold">{file?.name}</h1>
        <h2 className="text-xs font-normal text-neutral-400 drak:text-neutral-700">
          {file?.type} / {(file?.size / 1024 / 1024).toFixed(2)}MB
        </h2>
      </div>
      <div className="flex justify-end items-center">
        <X
          className="h-6 w-6 text-red-500 cursor-pointer hover:bg-red-500 hover:text-black 
                transition duration-300 ease-in-out"
          onClick={onRemove}
        />
      </div>
    </div>
  );
}