import React from "react";
import { redirect } from "next/navigation";

import { Home } from "@/components/pages/home";
import { Media } from "@/components/pages/media";
import { Photos } from "@/components/pages/photos";
import { Unknown } from "@/components/pages/unknown";
import { Profile } from "@/components/pages/profile";
import { Deleted } from "@/components/pages/deleted";
import { Settings } from "@/components/pages/settings";
import { Favorite } from "@/components/pages/favorite";
import { Documents } from "@/components/pages/documents";
import { FolderById } from "@/components/pages/folderById";

export const Routes = async ({ slug }: { slug: string[] }) => {
  if (!slug) return redirect("/dashboard");

  const currentRoute = handleMainRoute(slug);

  return <>{switchRoute(currentRoute)}</>;
};

const handleMainRoute = (routes: string[]) => {
  if (routes.length <= 1) {
    return routes[0];
  } else {
    return routes[1] || "/dashboard";
  }
};

const switchRoute = (currentRoute: string) => {
  switch (currentRoute) {
    case "home":
      return <Home />;
    case "favorites":
      return <Favorite />;
    case "deleted":
      return <Deleted />;
    case "profile":
      return <Profile />;
    case "settings":
      return <Settings />;
    case "photos":
      return <Photos />;
    case "documents":
      return <Documents />;
    case "media":
      return <Media />;
    case "unknown":
      return <Unknown />;
    default:
      return <FolderById Id={currentRoute} />;
  }
};
