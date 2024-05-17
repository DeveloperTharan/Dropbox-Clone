export type FolderType = {
  id: string;
  userId: string;
  name: string;
  isArchived: boolean;
  parentFolderId: string;
  createdAt: Date;
  updatedAt: Date;
};
