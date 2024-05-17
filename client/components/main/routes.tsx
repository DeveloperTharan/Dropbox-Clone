import React from "react";
import { redirect } from "next/navigation";

import axios from "axios";
import { getJwt } from "@/utils/get-jwt";
import { getUserId } from "@/utils/get-user-id";
import { FolderType } from "@/types/folder-type";
import { handleMainRoute } from "@/utils/route-handler";

import { Home } from "./pages/home";
import { Media } from "./pages/media";
import { Photos } from "./pages/photos";
import { Profile } from "./pages/profile";
import { Deleted } from "./pages/deleted";
import { Unknown } from "./pages/unknown";
import { Settings } from "./pages/settings";
import { Favorite } from "./pages/favorite";
import { Documents } from "./pages/documents";
import { FolderById } from "./pages/folderById";
import { FileType } from "@/types/file-type";

const apiBaseUrl = process.env.API_BASE_URL!;

export const Routes = async ({ slug }: { slug: string[] }) => {
  if (!slug) return redirect("/dashboard");

  const currentRoute = handleMainRoute(slug);

  const userId = getUserId();

  if (!userId) return null;

  const folder = await axios.get(`${apiBaseUrl}/folder/get?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${await getJwt(userId)}`,
    },
  });

  const files = await axios.get(
    `${apiBaseUrl}/file/get_all_files?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    }
  );

  return <>{switchRoute(currentRoute, folder.data, files.data)}</>;
};

const switchRoute = (
  currentRoute: string,
  folder: FolderType[] | undefined,
  files: FileType[] | undefined
) => {
  switch (currentRoute) {
    case "home":
      return <Home folder={folder} />;
    case "favorites":
      return <Favorite />;
    case "deleted":
      return <Deleted />;
    case "profile":
      return <Profile />;
    case "settings":
      return <Settings />;
    case "photos":
      return <Photos files={files} />;
    case "documents":
      return <Documents files={files} />;
    case "media":
      return <Media files={files} />;
    case "unknown":
      return <Unknown files={files} />;
    default:
      return <FolderById Id={currentRoute} />;
  }
};
