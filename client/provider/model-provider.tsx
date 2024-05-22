import React from "react";

import { CreateFolderModel } from "@/components/models/create-folder";
import { FileDeleteModel } from "@/components/models/delete-file";
import { FolderDeleteModel } from "@/components/models/delete-folder";

import { RenameFileModel } from "@/components/models/rename-file";
import { RenameFolderModel } from "@/components/models/rename-folder";

export const ModelProvider = () => {
  return (
    <>
      <CreateFolderModel />
      <FolderDeleteModel />
      <RenameFolderModel />

      <FileDeleteModel />
      <RenameFileModel />
    </>
  );
};
