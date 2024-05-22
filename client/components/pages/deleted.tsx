import React from "react";
import { TrashFileItems } from "../trash-file";
import { TrashFolderItems } from "../trash-folder";

export const Deleted = () => {
  return (
    <div className="flex flex-col">
      <TrashFileItems />
      <div className="my-8 border-b" />
      <TrashFolderItems />
    </div>
  );
};
