"use client";

import React, { useState } from "react";
import { ChevronRight, Folder, Plus } from "lucide-react";

export default function FolderList() {
  const [Open, setOpen] = useState<boolean>(false);

  const folders = [
    {
      id: 1,
      name: "folder 1",
    },
    {
      id: 2,
      name: "folder 1",
    },
    {
      id: 3,
      name: "folder 1",
    },
    {
      id: 4,
      name: "folder 1",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        {folders.map((folder) => (
          <div
            className="flex gap-x-3 justify-between items-center pl-5 py-[10px] w-full
              hover:bg-neutral-200 dark:hover:bg-gray-800 cursor-pointer group"
            onClick={() => setOpen(!Open)}
          >
            <div className="flex gap-x-3 justify-start items-center">
              <div className="text-[12px] font-light">
              <ChevronRight className={`h-[14px] w-[14px] font-light ${Open && "rotate-90"}`} />
              </div>
              <div className="text-[12px] font-light pl-2">
                <Folder className="h-[14px] w-[14px] font-light" />
              </div>
              <div className="text-[13px]">{folder.name}</div>
            </div>
            <div
              className="opacity-0 group-hover:opacity-100 mr-4 transition duration-300 hover:bg-background
                p-1 rounded-[5px]"
            >
              <Plus className="h-[14px] w-[14px] font-light" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
