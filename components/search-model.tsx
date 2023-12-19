"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileColorExtension } from "@/constants/color-constant";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

export function SearchModel({ children }: { children: React.ReactNode }) {
  const [searchDocument, setSearchDocument] = useState("");

  const { userId } = useAuth();
  const router = useRouter();
  const items = useQuery(api.file.getSearch, { userID: userId! as string });

  const truncate = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-2xl h-full max-h-[70%]">
        <DialogHeader>
          <DialogTitle>Search your Files!</DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-2 mt-2">
              <div className="grid flex-1 gap-2">
                <Input
                  id="link"
                  className="w-full"
                  placeholder="Search your Files!"
                  onChange={(e) => setSearchDocument(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full mt-10">
              <p className="hidden last:block text-sm text-center text- pb-2">
                No results found.
              </p>
              {items
                ?.filter((item) => {
                  return searchDocument.toLowerCase() === ""
                    ? item
                    : item.name.toLowerCase().includes(searchDocument);
                })
                .map((item) => {
                  const type = item?.type as string;
                  const extension: string = type.split("/")[1];
                  const formatDate = (timestamp: number) => {
                    const date = new Date(timestamp);
                    const formattedDate = date.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                    return formattedDate;
                  };

                  return (
                    <Link
                      href={item?.url}
                      target="_blank"
                      key={item?._id}
                      className="flex justify-normal items-center gap-x-4 hover:bg-gray-400 
                    dark:hover:bg-gray-800 w-full my-2 px-2 py-1 rounded-[4px] cursor-pointer"
                    >
                      <div className="h-4 w-4">
                        <FileIcon
                          extension={extension}
                          labelColor={FileColorExtension[extension]}
                          //@ts-ignore
                          {...defaultStyles[extension]}
                        />
                      </div>
                      <h1 className="text-sm font-normal">
                        {truncate(`${item?.name}`, 25)}
                      </h1>
                      <div className="ml-auto">
                        {item ? formatDate(item._creationTime) : "-"}
                      </div>
                    </Link>
                  );
                })}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
