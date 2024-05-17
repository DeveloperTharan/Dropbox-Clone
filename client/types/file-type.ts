import { boolean, string } from "zod";

export type FileType = {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  fileStoragePath: string;
  fileURL: string;
  folderId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  favorite: boolean;
  archived: boolean;
};
