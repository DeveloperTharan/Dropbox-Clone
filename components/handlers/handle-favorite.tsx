"use client";

import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function HandleFavorite({
  initialData,
  id,
}: {
  initialData: boolean;
  id: string;
}) {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    initialData || false
  );

  const { userId } = useAuth();

  if(!userId){
    redirect("/sign-in");
  }

  const update = useMutation(api.file.update);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setIsFavorite(initialData);
    const promise = update({
      id: id as Id<"File">,
      userID: userId as string,
      isFavorite: true,
    }).finally(() => setIsFavorite(true));

    toast.promise(promise, {
      loading: "Adding to Favorite",
      success: "Added to Favorite successfully",
      error: "Error! try again.",
      duration: 2000,
    })
  };

  const handleRemoveFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    
    setIsFavorite(initialData);
    const promise = update({
      id: id as Id<"File">,
      userID: userId! as string,
      isFavorite: false,
    }).finally(() => setIsFavorite(false));

    toast.promise(promise, {
      loading: "Removing from Favorite",
      success: "Remove from Favorite successfully",
      error: "Error! try again.",
      duration: 2000,
    })
  };

  return (
    <>
      {!isFavorite ? (
        <div
          className="flex flex-row gap-x-2 justify-start items-center w-full h-auto"
          role="button"
          onClick={handleFavorite}
        >
          <Star className="h-4 w-4" />
          <span className="text-sm">Add to Favorite</span>
        </div>
      ) : (
        <div
          className="flex flex-row gap-x-2 justify-start items-center w-full h-auto"
          role="button"
          onClick={handleRemoveFavorite}
        >
          <StarOff className="h-4 w-4" />
          <span className="text-sm">Remove Favorite</span>
        </div>
      )}
    </>
  );
}
