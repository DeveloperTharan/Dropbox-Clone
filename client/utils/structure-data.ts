import { FolderType } from "@/types/folder-type";

export interface FolderNode extends FolderType {
  children?: FolderNode[];
}

export const StructureData = (
  folderArray: FolderType[] | undefined,
  parentId: string | null = null
): FolderNode[] | undefined => {
  if (!folderArray) return undefined;

  const convertedArray = folderArray.map((doc) => ({
    ...doc,
    createdAt: new Date(doc.createdAt),
  }));

  convertedArray.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  return convertedArray
    .filter((document) => document.parentFolderId === parentId)
    .map((document) => ({
      ...document,
      children: StructureData(folderArray, document.id),
    }));
};
