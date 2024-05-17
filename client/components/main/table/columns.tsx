"use client";

import Link from "next/link";

import { FileType } from "@/types/file-type";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon, defaultStyles } from "react-file-icon";
import { FileColorExtension } from "@/constants/color-constant";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileMenu } from "../pages/_components/file-menu";

import { ArrowUpDown } from "lucide-react";
import { formatDate } from "@/utils/formate-date";

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
    accessorKey: "fileType",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("fileType");
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
    accessorKey: "fileName",
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
      const filename = row.getValue("fileName");
      return <div className="pl-4">{filename as string}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Date Added",
    cell: ({ row }) => {
      const timestamp = row.getValue("createdAt");

      return <span>{formatDate(timestamp as number)}</span>;
    },
  },
  {
    accessorKey: "fileSize",
    header: "Size",
    cell: ({ row }) => {
      const size = row.getValue("fileSize");
      return <span>{size as string}</span>;
    },
  },
  {
    accessorKey: "fileURL",
    header: "Link",
    cell: ({ row }) => {
      const link: string | undefined = row.getValue("fileURL");

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

      return <FileMenu file={file} />;
    },
  },
];
