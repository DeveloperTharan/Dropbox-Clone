import { z } from "zod";

export const uploadSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.string(),
  fileStoragePath: z.string(),
  fileURL: z.string(),
  folderId: z.string(),
  userId: z.optional(z.string()),
});

export const renameFile = z.object({
  newname: z
    .string()
    .min(2, {
      message: "min of 2 characters required!",
    })
    .max(20, {
      message: "max of 20 characters!",
    }),
});
