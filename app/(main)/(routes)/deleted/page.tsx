import React from "react";
import TrashFileItems from "./components/TrashFileItems";
import TrashFolderItems from "./components/TrashFolderItems";

export default function Deleted() {
  return (
    <div className="flex flex-col">
      <TrashFileItems />
      <div className="my-8 border-b" />
      <TrashFolderItems/>
    </div>
  );
}
