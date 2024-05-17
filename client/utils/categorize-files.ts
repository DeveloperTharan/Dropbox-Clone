import { FileType } from "@/types/file-type";

export const categorizeFiles = (files: FileType[]) => {
  const categories = {
    image: [] as FileType[],
    media: [] as FileType[],
    documents: [] as FileType[],
    unknown: [] as FileType[],
  };

  files.forEach((file) => {
    const fileType = file.fileType.toLowerCase();

    if (fileType.startsWith("image/")) {
      categories.image.push(file);
    } else if (fileType.startsWith("video/")) {
      categories.media.push(file);
    } else if (
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/plain",
      ].includes(fileType)
    ) {
      categories.documents.push(file);
    } else {
      categories.unknown.push(file);
    }
  });

  return { categories };
};
