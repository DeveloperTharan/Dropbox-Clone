"use client";

import React, { ElementRef, useRef, useState } from "react";

import { toast } from "sonner";
import { superbase } from "@/lib/superbase";
import { bytesReader } from "@/utils/bytes-reader";
import { generateCUID } from "@/utils/generate-cuid";

import { CloudUpload } from "lucide-react";
import { uploadFile } from "@/action/file";
import { useRouter } from "next/navigation";

export const Dropzone = ({ folderId }: { folderId: string }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const inputRef = useRef<ElementRef<"input">>(null);

  const router = useRouter();

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current?.click();
    }
  };

  const handleFileUpload = async (file: File) => {
    const maxSizeInBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast.error("File size exceeds 50MB limit");
      return;
    }

    try {
      toast.promise(
        (async () => {
          const { data, error } = await superbase.storage
            .from("files")
            .upload(`${file.name}/${generateCUID()}`, file);

          if (error) {
            throw new Error(error.message);
          }

          const url = superbase.storage.from("files").getPublicUrl(data.path)
            .data.publicUrl;

          const upload = {
            fileName: file.name,
            fileType: file.type,
            fileSize: bytesReader(file.size),
            fileStoragePath: data.path,
            fileURL: url,
            folderId: folderId,
          };

          uploadFile(upload).finally(() => router.refresh());
        })(),
        {
          loading: "Uploading file...",
          success: "File uploaded successfully!",
          error: "Error uploading file",
        }
      );
    } catch (error) {
      toast.error(`Error reading file: ${error}`);
    }
  };

  const handleFileChange = async (uploadedFiles: FileList) => {
    const filesArray = Array.from(uploadedFiles);
    for (const file of filesArray) {
      await handleFileUpload(file);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      await handleFileChange(e.target.files);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await handleFileChange(e.dataTransfer.files);
      setDragActive(false);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
  };

  return (
    <div
      className={`w-full h-[225px] border-[1px] border-dashed flex flex-col justify-center items-center 
      text-center cursor-pointer group hover:border-neutral-400 ${
        dragActive
          ? "bg-blue-200/80 dark:bg-blue-950"
          : "bg-gray-200/80 dark:bg-gray-900/80"
      }`}
      onClick={openFileExplorer}
    >
      <form
        className="h-full w-full flex flex-col justify-center items-center text-center gap-y-4"
        onDrop={handleDrop}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
        />
        <CloudUpload className="w-10 h-10 text-muted-foreground" />
        <div className="flex flex-row justify-center items-center text-center text-md gap-x-2 text-muted-foreground">
          Click to upload or <strong className="text-blue-700">drag</strong> and
          <strong className="text-blue-700">drop</strong>
        </div>
      </form>
    </div>
  );
};
