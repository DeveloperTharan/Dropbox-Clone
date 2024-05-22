"use client";

import React, { ElementRef, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { superbase } from "@/lib/supabase";
import { createId } from "@paralleldrive/cuid2";
import { bytesReader } from "@/utils/byte-reader";
import { useUploadFile } from "@/query/file/api/use-upload-file";

import { CloudUpload } from "lucide-react";

export const Dropzone = ({ folderId }: { folderId: string }) => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const inputRef = useRef<ElementRef<"input">>(null);

  const { toast } = useToast();

  const { mutate, isPending } = useUploadFile(folderId);

  const openFileExplorer = () => {
    if (inputRef.current) {
      inputRef.current.disabled = isPending;
      inputRef.current.value = "";
      inputRef.current.click();
    }
  };

  const handleFileUpload = async (file: File) => {
    const maxSizeInBytes = 50 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      toast({
        title: "Error",
        description: "File size exceeds 50MB limit",
      });
      return;
    }

    const { data, error } = await superbase.storage
      .from("files")
      .upload(`${file.name}/${createId()}`, file);

    if (error) {
      toast({
        title: `${error.name}`,
        description: `${error.message}`,
      });

      return;
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

    mutate(upload);
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
      className={cn(
        "relative w-full h-[225px] border-[1px] border-dashed flex flex-col justify-center items-center text-center cursor-pointer group hover:border-neutral-400",
        dragActive
          ? "bg-blue-200/80 dark:bg-blue-950"
          : "bg-gray-200/80 dark:bg-gray-900/80",
        isPending && "bg-primary/50 animate-pulse cursor-wait"
      )}
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
