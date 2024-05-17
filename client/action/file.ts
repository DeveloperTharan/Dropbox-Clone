"use server";

import { z } from "zod";
import axios from "axios";
import { renameFile, uploadSchema as uploadSchema } from "@/schema/file";
import { getUserId } from "@/utils/get-user-id";
import { getJwt } from "@/utils/get-jwt";

const apiBaseUrl = process.env.API_BASE_URL!;

export const uploadFile = async (data: z.infer<typeof uploadSchema>) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    const completeData = { ...data, userId };

    const isValidData = uploadSchema.safeParse(completeData);
    if (!isValidData.success) return { error: "Invalid data" };

    await axios.post(`${apiBaseUrl}/file/upload`, completeData, {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    });

    return { success: "File uploaded successfully!" };
  } catch (error) {
    console.log("FILE_UPLOAD_ERROR", error);
    return { error: "something went's wrong" };
  }
};

export const RenameFile = async (
  data: z.infer<typeof renameFile>,
  fileId: string
) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    const validateFields = renameFile.safeParse(data);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const res = await axios.patch(
      `${apiBaseUrl}/file/update?fileId=${fileId}&type=NAME`,
      data.newname,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
          "Content-Type": "text/plain",
        },
      }
    );

    return { success: `${res.data?.fileName} renamed succrssfully!` };
  } catch (error) {
    console.log("FOLDER_RENAME_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};

export const HandleFavorite = async (fileId: string) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    const res = await axios.patch(
      `${apiBaseUrl}/file/update?fileId=${fileId}&type=ISFAVORITE`,
      null,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    const message = res.data.favorite
      ? `${res.data.fileName} added to favorites successfully!`
      : `${res.data.fileName} removed from favorites successfully!`;

    return { success: message };
  } catch (error) {
    console.error("HANDLE_FAVORITE_ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const ArchiveFile = async (fileId: string) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    if (!fileId) return { error: "fileId or userId is missing!" };

    const res = await axios.patch(
      `${apiBaseUrl}/file/archive?fileId=${fileId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("FILE_ARCHIVE_ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const UnArchiveFile = async (fileId: string) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    if (!fileId) return { error: "fileId or userId is missing!" };

    const res = await axios.patch(
      `${apiBaseUrl}/file/un_archive?fileId=${fileId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("FILE_UN_ARCHIVE_ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const DeleteFile = async (fileId: string) => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    if (!fileId) return { error: "fileId or userId is missing!" };

    const res = await axios.delete(
      `${apiBaseUrl}/file/delete?fileId=${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${await getJwt(userId)}`,
        },
      }
    );

    return { success: `${res.data}` };
  } catch (error) {
    console.log("FILE_DELETE_ERROR", error);
    return { error: "Something went's wrong try again!" };
  }
};
