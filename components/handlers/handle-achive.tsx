"use client";

import React, { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function HandleAchive({
  initialData,
  id,
}: {
  initialData: boolean;
  id: string;
}) {
  const [isAchived, setIsAchived] = useState<boolean | undefined>(
    initialData || false
  );

  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const update = useMutation(api.file.update);

  const handleAchive = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setIsAchived(initialData);
    const promise = update({
      id: id as Id<"File">,
      userID: userId as string,
      isArchived: true,
    }).finally(() => setIsAchived(true));

    toast.promise(promise, {
      loading: "Deleting file",
      success: "Deleted successfully",
      error: "Error! try again.",
      duration: 2000,
    });
  };

  return (
    <div
      className="flex flex-row gap-x-2 justify-start items-center w-full h-auto"
      onClick={handleAchive}
    >
      <Trash2 className="h-4 w-4" />
      <span className="text-sm">Delete</span>
    </div>
  );
}
