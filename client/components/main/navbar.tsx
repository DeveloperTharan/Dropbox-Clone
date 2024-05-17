import React from "react";

import { UserMenu } from "./user-menu";
import { FolderType } from "@/types/folder-type";
import { ModeToggler } from "@/components/ui/mode-toggler";
import { MediaSideBar } from "@/components/main/media-sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { AlignJustify, Bell, Grip, HelpCircle, Search } from "lucide-react";

export const NavBar = ({ folder }: { folder: FolderType[] | undefined }) => {
  return (
    <div className="w-full flex items-center py-5 z-50 bg-background sticky top-0">
      <div className="md:hidden px-3" role="button">
        <MediaSideBar folder={folder}>
          <AlignJustify className="h-5 w-5" />
        </MediaSideBar>
      </div>
      <div className="w-full flex justify-around items-center gap-x-4 lg:gap-x-20">
        <div
          className="w-full flex justify-start items-center border-[1px] border-gray-200 
          p-3 gap-x-2 hover:border-gray-900 dark:border-gray-900 dark:hover:border-neutral-400
          cursor-text"
        >
          <span>
            <Search className="w-4 h-4 text-gray-500" />
          </span>
          <span className="text-gray-500">search</span>
        </div>

        <div className=" flex items-center gap-x-5 pr-6">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Grip className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Explore more Dropbox app</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <HelpCircle className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>See what&apos;s new</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Bell className="w-5 h-5" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Notification</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="mt-1">
            <ModeToggler />
          </span>
          <UserMenu />
        </div>
      </div>
    </div>
  );
};
