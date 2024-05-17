import {
  Cylinder,
  ImageDown,
  Waypoints,
  PencilLine,
  Trash,
  FileHeart,
  LayoutDashboard,
  UserRound,
  Bolt,
} from "lucide-react";

export const menu = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    name: "Home",
    href: "/dashboard/home",
    icon: Cylinder,
  },
  {
    id: 3,
    name: "Favorites",
    href: "/dashboard/favorites",
    icon: FileHeart,
  },
  {
    id: 4,
    name: "Deleted",
    href: "/dashboard/deleted",
    icon: Trash,
  },
  {
    id: 5,
    name: "Profile",
    href: "/dashboard/profile",
    icon: UserRound,
  },
  {
    id: 6,
    name: "Settings",
    href: "/dashboard/settings",
    icon: Bolt,
  },
];
