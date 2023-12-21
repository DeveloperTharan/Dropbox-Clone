"use client";

import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HandleAchiveFolder({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();

  const { userId } = useAuth();

  const achive = useMutation(api.file.archiveFolder);

  const handleAchive = (e: React.MouseEvent) => {
    e.preventDefault();

    const promise = achive({
      id: id as Id<"Folder">,
      userID: userId! as string,
    });

    toast.promise(promise, {
      loading: "Deleting file",
      success: "Deleted successfully",
      error: "Error! try again.",
      duration: 2000,
    });

    router.push("/home");
  };

  return <div onClick={handleAchive}>{children}</div>;
}
