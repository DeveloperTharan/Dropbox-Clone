"use client";

import React, { useState } from "react";
import { Star, StarOff } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAuth } from "@clerk/nextjs";

export default function HandleFavorite({
  initialData,
  id,
}: {
  initialData: boolean;
  id: Id<"File">;
}) {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(
    initialData || false
  );

  const { userId } = useAuth();

  const update = useMutation(api.file.update);

  const handleFavorite = () => {
    setIsFavorite(initialData);
    const promise = update({
      id: id as Id<"File">,
      userID: userId! as string,
      isFavorite: true,
    }).finally(() => setIsFavorite(true));
  };

  const handleRemoveFavorite = () => {
    setIsFavorite(initialData);
    const promise = update({
      id: id as Id<"File">,
      userID: userId! as string,
      isFavorite: false,
    }).finally(() => setIsFavorite(false));
  };

  return (
    <>
      {!isFavorite ? (
        <div
          className="flex flex-row gap-x-2 justify-start items-center"
          role="button"
          onClick={handleFavorite}
        >
          <Star className="h-4 w-4" />
          <span className="text-sm">Add to Favorite</span>
        </div>
      ) : (
        <div
          className="flex flex-row gap-x-2 justify-start items-center"
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
