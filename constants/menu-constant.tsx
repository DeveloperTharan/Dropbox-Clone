import { Cylinder, ImageDown, Waypoints, PencilLine, Trash, FileHeart } from "lucide-react";

export const menu = [
    {
      id: 1,
      name: "All Files",
      href: "/home",
      Icon: <Cylinder className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 2,
      name: "Photos",
      href: "/photos",
      Icon: <ImageDown className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 3,
      name: "Favorites",
      href: "/favorites",
      Icon: <FileHeart className="h-[14px] w-[14px] font-light" />,
    },
    {
      id: 4,
      name: "Deleted",
      href: "/deleted",
      Icon: <Trash className="h-[14px] w-[14px] font-light" />,
    },
  ];