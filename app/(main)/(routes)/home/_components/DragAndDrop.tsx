"use client";

import React, { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useEdgeStore } from "@/lib/edgestore";

interface CustomFile extends File {
  url?: string;
}

export default function DragAndDrop() {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const { userId } = useAuth();

  const inputRef = useRef<any>(null);

  const { edgestore } = useEdgeStore();

  const createNewFile = useMutation(api.file.createFile);

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  const handleFileUpload = async (file: CustomFile) => {
    const response = await edgestore.publicFiles.upload({ file });

    await createNewFile({
      name: file.name,
      size: file.size,
      type: file.type,
      url: response.url,
      userID: userId!,
    });
  };

  const handleFileChange = async (uploadedFiles: CustomFile[]) => {
    setFiles((prevState: CustomFile[]) => [...prevState, ...uploadedFiles]);

    for (const file of uploadedFiles) {
      if (file && file.name) {
        await handleFileUpload(file);
      }
    }
  };

  const handleChange = async (e: any) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      const uploadedFiles = Array.from(e.target.files) as CustomFile[];
      await handleFileChange(uploadedFiles);
      setFiles([]);
    }
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files) as CustomFile[];

      await handleFileChange(droppedFiles);
      setFiles([]);
    }
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(true);
  };

  const removeFile = (index: number) => {
    const newArr = [...files];
    newArr.splice(index, 1);
    setFiles([]);
    setFiles(newArr);
  };

  const handleUplodeFiles = async () => {
    for (const file of files) {
      if (file && file.name) {
        const response = await edgestore.publicFiles.upload({ file });

        await createNewFile({
          name: file.name,
          size: file.size,
          type: file.type,
          url: response.url,
          userID: userId!,
        });
      }
    }

    setFiles([]);
  };

  console.log(files);

  return (
    <div
      className={`w-full h-[180px] border-[1px] border-dashed flex flex-col justify-center items-center 
          text-center cursor-pointer group hover:border-neutral-400 ${
            dragActive
              ? "bg-blue-200/80 dark:bg-blue-950"
              : "bg-gray-300/80 dark:bg-gray-900/80"
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
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={true}
          onChange={handleChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <div className="flex flex-row justify-center items-center text-center text-md gap-x-2">
          Click to uplode or <strong className="text-blue-700">drag</strong> and
          <strong className="text-blue-700">drop</strong>
        </div>
      </form>
    </div>
  );
}
