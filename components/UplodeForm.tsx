"use client";

import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEdgeStore } from "@/lib/edgestore";
import { Button } from "@/components/ui/button";
import FilePreview from "../app/(main)/(routes)/home/_components/FilePreview";

function UplodeForm({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<any>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const inputRef = useRef<any>(null);

  const { edgestore } = useEdgeStore();

  const handleChange = (e: any) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.target.files[i]]);
      }
    }
  };

  const openFileExplorer = () => {
    inputRef.current.value = "";
    inputRef.current.click();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [...prevState, e.dataTransfer.files[i]]);
      }
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

  const handleUplodeFiles = () => {
    {
      files.map(async (file: any) => {
        if (file) {
          const response = await edgestore.publicFiles.upload({ file });
        }
      });
    }

    setFiles([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[64rem] h-auto max-h-[70%]">
        <DialogHeader>
          <DialogTitle>Uplode Your File</DialogTitle>
          <DialogDescription className="flex gap-x-1">
            Uplode more files and data?..
            <h4 className="text-blue-500 underline font-semibold" role="button">
              Upgrade
            </h4>
          </DialogDescription>
        </DialogHeader>
        <div
          className={`w-full h-[180px] border-[1px] border-dashed flex flex-col justify-center items-center 
          text-center cursor-pointer group hover:border-neutral-400 ${
          dragActive ? "bg-blue-200/80 dark:bg-blue-950" : "bg-gray-300/80 dark:bg-gray-900/80"
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
              Click to uplode or <strong className="text-blue-700">drag</strong>{" "}
              and
              <strong className="text-blue-700">drop</strong>
            </div>
          </form>
        </div>
        <div className="mt-5 flex justify-center items-center">
          <Button
            variant="default"
            size="sm"
            className="disabled:bg-gray-600"
            onClick={handleUplodeFiles}
            disabled={files.length === 0}
          >
            Uplode
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          {files.length === 0 ? null : (
            <div className="mt-5 w-full h-auto">
              {files.map((file: any, index: number) => (
                <div key={index}>
                  <FilePreview file={file} onRemove={() => removeFile(index)} />
                </div>
              ))}
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UplodeForm;
