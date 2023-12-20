import React from "react";
import DragAndDrop from "@/components/DragAndDrop";
import TableWrapper from "@/components/table/table-wrapper";

export default function Home() {
  return (
    <>
      <DragAndDrop />
      <div className="mt-14 mb-32 border-t">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold my-8 ml-2">All Files</h1>
          <h6 className="text-sm text-gray-400 dark:text-gray-600">
            Only you can access
          </h6>
        </div>
        <TableWrapper />
      </div>
    </>
  );
}
