"use client";

import { FileColorExtension } from "@/constants/color-constant";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";
import Link from "next/link";
import Menu from "../Menu";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export type FileType = {
  id: string;
  timestamp: number;
  userID: string;
  filename: string;
  downloadURL: string;
  size: number;
  isArchived: boolean;
  isFavorite: boolean;
  type: string;
};

export const columns: ColumnDef<FileType>[] = [
  {
    id: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ), 
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      const extension: string = type.split("/")[1];
      return (
        <div className="h-6 w-6">
          <FileIcon
            extension={extension}
            labelColor={FileColorExtension[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FileName
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const filename = row.getValue("filename");
      return <div className="pl-4">{filename as string}</div>;
    },
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ row }) => {
      const timestamp = row.getValue("timestamp");

      const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return formattedDate;
      };

      return <span>{formatDate(timestamp as number)}</span>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size = row.getValue("size");
      return <span>{prettyBytes(size as number)}</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ row }) => {
      const link: string | undefined = row.getValue("downloadURL");

      if (link && typeof link === "string" && link.trim() !== "") {
        return (
          <Link
            href={link}
            target="_blank"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            link
          </Link>
        );
      }

      return <span>No Link Available</span>;
    },
  },
  {
    accessorKey: "id",
    id: "id",
    header: "",
    cell: ({ row }) => {
      const file: FileType = { ...row.original };

      return <Menu file={file} />;
    },
  },
];
