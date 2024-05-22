"use server";

import { z } from "zod";
import axios from "axios";
import { getJwt } from "@/utils/get-jwt";
import { getUserId } from "@/utils/get-userId";
import { createFolderSchema, renameFolder } from "@/schema/folder";

const apiBaseUrl = process.env.API_BASE_URL!;

export const CreateFolder = async (
  data: z.infer<typeof createFolderSchema>
) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized" };

    const completeData = { ...data, userId: userId };

    const validateFields = createFolderSchema.safeParse(completeData);
    if (!validateFields.success) return { error: "Invalid fields!" };

    const res = await axios.post(
      `${apiBaseUrl}/folder/create`,
      validateFields.data,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );
    console.log(res.data);

    return { success: `${res.data?.folder_name} created successfully!` };
  } catch (error) {
    console.log("CREATE_Error", error);

    return { error: "Something went wrong, try again!" };
  }
};

export const getFolders = async () => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized" };

    const res = await axios.get(`${apiBaseUrl}/folder/get?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("GET_Error", error);
    return { error: "Something went wrong, try again!" };
  }
};

export const getFoldersById = async (Id: string) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized" };

    const res = await axios.get(`${apiBaseUrl}/file/get?folderId=${Id}`, {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    });

    return res.data;
  } catch (error) {
    console.log("GET_Error", error);
    return { error: "Something went wrong, try again!" };
  }
};

export const RenameFolder = async (
  data: z.infer<typeof renameFolder>,
  folderId: string
) => {
  const userId = getUserId();
  if (!userId) return { error: "Unauthorized" };

  const validateFields = renameFolder.safeParse(data);
  if (!validateFields.success) return { error: "Invalid fields!" };

  try {
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

    return { success: `${res.data?.folder_name} renamed successfully!` };
  } catch (error) {
    console.log("RENAME_Error", error);
    return { error: "Something went wrong, try again!" };
  }
};

export const archiveFolder = async (folderId: string) => {
  return archiveOrUnarchiveFolder("archive", folderId);
};

export const getArchiveFolders = async () => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized" };

    const res = await axios.get(
      `${apiBaseUrl}/folder/archive_folders?userId=${userId}`,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("GET_Error", error);
    return { error: "Something went wrong, try again!" };
  }
};

export const unarchiveFolder = async (
  folderId: string,
  parentFolderId: string
) => {
  return archiveOrUnarchiveFolder("un_archive", folderId, parentFolderId);
};

const archiveOrUnarchiveFolder = async (
  endpoint: string,
  folderId: string,
  parentFolderId?: string
) => {
  const userId = getUserId();
  if (!userId) return { error: "Unauthorized" };

  if (!folderId) return { error: "FolderId is missing!" };
  if (endpoint.includes("un_archive") && !parentFolderId)
    return { error: "Parent folder is missing!" };

  try {
    const res = await axios.patch(
      `${apiBaseUrl}/folder/${endpoint}?folderId=${folderId}`,
      parentFolderId ? { parentFolderId } : null,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("ARCHIVE_HANDLER_Error", error);
    return { error: "Something went wrong, try again!" };
  }
};

export const deleteFolder = async (folderId: string) => {
  const userId = getUserId();
  if (!userId) return { error: "Unauthorized" };

  if (!folderId) return { error: "folderId or userId is missing!" };

  try {
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
    console.log("DELETE_Error", error);
    return { error: "Something went wrong, try again!" };
  }
};
