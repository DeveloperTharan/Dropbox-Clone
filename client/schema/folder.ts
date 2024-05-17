import { z } from "zod";

export const createFolderSchema = z.object({
  user_id: z.string(),
  folder_name: z
    .string()
    .min(2, {
      message: "min of 2 characters required!",
    })
    .max(20, {
      message: "max of 20 characters!",
    }),
  parentfolder_id: z.optional(z.string().nullable()),
});

export const renameFolder = z.object({
  newName: z
    .string()
    .min(2, {
      message: "min of 2 characters required!",
    })
    .max(20, {
      message: "max of 20 characters!",
    }),
});
