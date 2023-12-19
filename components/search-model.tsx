"use client";

import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import RenderValue from "./renderValue";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SearchModel({ children }: { children: React.ReactNode }) {
  const [searchDocument, setSearchDocument] = useState<string>("");
  const [activeButton, setActiveButton] = useState<"files" | "folders">("files");

  const handleButtonClick = (buttonType: "files" | "folders") => {
    setActiveButton(buttonType);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl h-fit max-h-[70%]">
        <DialogHeader>
          <DialogTitle className="w-full h-full max-w-full max-h-fit">
            <span>Search your Files!</span>
            <div className="flex items-center space-x-2 mt-4">
              <div className="grid flex-1 gap-2">
                <Input
                  id="link"
                  className="w-full"
                  placeholder="Search your Files!"
                  onChange={(e) => setSearchDocument(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-row justify-start items-center gap-x-4 mt-3">
              <button
                className={`text-xs px-3 py-1 rounded-[8px] border hover:bg-gray-200 
                dark:hover:bg-gray-800 ${
                  activeButton === "files" && "bg-gray-200 dark:bg-gray-800"
                }`}
                onClick={() => handleButtonClick("files")}
              >
                Files
              </button>
              <button
                className={`text-xs px-3 py-1 rounded-[8px] border hover:bg-gray-200 
                dark:hover:bg-gray-800 ${
                  activeButton === "folders" && "bg-gray-200 dark:bg-gray-800"
                }`}
                onClick={() => handleButtonClick("folders")}
              >
                Folders
              </button>
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="w-full mt-5">
              <p className="hidden last:block text-sm text-center text- pb-2">
                No results found.
              </p>
              <RenderValue
                searchDocument={searchDocument}
                activeButton={activeButton}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
