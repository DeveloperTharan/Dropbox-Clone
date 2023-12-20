import React from "react";
import DragAndDrop from "@/components/DragAndDrop";
import TableWrapper from "@/components/table/table-wrapper";

export default function Home() {
  return (
    <>
      <DragAndDrop />
      <div className="mt-14 mb-32 border-t">
        <h1 className="text-xl font-normal my-8 ml-2">All Files</h1>
        <TableWrapper />
      </div>
    </>
  );
}
