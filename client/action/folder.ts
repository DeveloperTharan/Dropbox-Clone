"use server";

import { z } from "zod";
import { createFolderSchema, renameFolder } from "@/schema/folder";
import axios from "axios";
import { getJwt } from "@/utils/get-jwt";

const apiBaseUrl = process.env.API_BASE_URL!;

export const createFolder = async (
  data: z.infer<typeof createFolderSchema>
) => {
  try {
    const validateFields = createFolderSchema.safeParse(data);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const res = await axios.post(`${apiBaseUrl}/folder/create`, data, {
      headers: {
        Authorization: `Bearer ${await getJwt(data.user_id)}`,
      },
    });

    return { success: `${res.data?.folder_name} created successfully!` };
  } catch (error) {
    console.log("FOLDER_CREATE_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const RenameFolder = async (
  data: z.infer<typeof renameFolder>,
  userId: string,
  folderId: string
) => {
  try {
    const validateFields = renameFolder.safeParse(data);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const res = await axios.patch(
      `${apiBaseUrl}/folder/update?folderId=${folderId}`,
      data.newName,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
          "Content-Type": "text/plain",
        },
      }
    );

    return { success: `${res.data?.folder_name} renamed succrssfully!` };
  } catch (error) {
    console.log("FOLDER_RENAME_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const ArchiveFolder = async (folderId: string, userId: string) => {
  try {
    if (!folderId || !userId)
      return { error: "folderId or userId is missing!" };

    const res = await axios.patch(
      `${apiBaseUrl}/folder/archive?folderId=${folderId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("FOLDER_ARCHIVE_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const UnArchiveFolder = async (
  folderId: string,
  userId: string,
  parentFolderId: string
) => {
  try {
    if (!folderId || !userId)
      return { error: "folderId or userId is missing!" };

    if (parentFolderId !== null) return { error: "Parent folder is missing!" };

    const res = await axios.patch(
      `${apiBaseUrl}/folder/un_archive?folderId=${folderId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("FOLDER_UN_ARCHIVE_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const DeleteFolder = async (folderId: string, userId: string) => {
  try {
    if (!folderId || !userId)
      return { error: "folderId or userId is missing!" };

    const res = await axios.delete(
      `${apiBaseUrl}/folder/delete?folderId=${folderId}`,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("FOLDER_UN_ARCHIVE_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};
