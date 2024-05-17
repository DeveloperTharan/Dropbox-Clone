import React from "react";

import axios from "axios";
import { getJwt } from "@/utils/get-jwt";
import { getUserId } from "@/utils/get-user-id";

import FavoriteFiles from "./_components/favorite-files";

const apiBaseUrl = process.env.API_BASE_URL!;

export const Favorite = async () => {
  const userId = getUserId();

  if (!userId) return null;

  const favoriteFiles = await axios.get(
    `${apiBaseUrl}/file/favorite_files?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    }
  );

  return (
    <>
      <FavoriteFiles files={favoriteFiles.data} />
    </>
  );
};
