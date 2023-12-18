import { ArrowUpFromLine, FolderClosed } from "lucide-react";
import React from "react";
import UplodeForm from "../../../../../components/UplodeForm";
import CreateFolder from "../../../../../components/CreateFolder";

export default function ToolBar() {
  return (
    <div className="w-full h-[80px] flex flex-row gap-x-8">
      <UplodeForm>
        <div
          className="flex flex-col justify-start items-start border h-[80px] w-44 px-6 py-3
          hover:bg-gray-300/80 hover:dark:bg-gray-900/80 cursor-pointer"
        >
          <ArrowUpFromLine className="h-4 w-4 mt-1 font-light" />
          <h3 className="relative top-4 text-sm">Uplode</h3>
        </div>
      </UplodeForm>
      <CreateFolder>
        <div
          className="flex flex-col justify-start items-start border w-44 px-6 py-3 
        hover:bg-gray-300/80 hover:dark:bg-gray-900/80 cursor-pointer"
        >
          <FolderClosed className="h-4 w-4 mt-1 font-light" />
          <h3 className="relative top-4 text-sm">Create Folder</h3>
        </div>
      </CreateFolder>
    </div>
  );
}
