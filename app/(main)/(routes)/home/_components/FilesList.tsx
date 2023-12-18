'use client'

import React from "react";
import { Button } from "@/components/ui/button";
import TableWrapper from "./TableWrapper";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";

export default function FilesList() {
    const { userId } = useAuth()

    const Files = useQuery(api.file.getFiles, { userID: userId! });

  return (
    <>
      <h1 className="text-lg font-semibold">All Files</h1>
      <div className="mt-12 mb-20">
        <TableWrapper fileslist={Files}/>
      </div>
    </>
  );
}

