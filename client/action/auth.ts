"use server";

import { z } from "zod";
import axios from "axios";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { signUpSchema, signInSchema } from "@/schema/auth";
import { validateJWT } from "@/utils/validate-jwt";
import { getUserId } from "@/utils/get-userId";
import { getJwt } from "@/utils/get-jwt";

const apiBaseUrl = process.env.API_BASE_URL;

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  try {
    const validatedFields = signUpSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    await axios.post(`${apiBaseUrl}/auth/sign-up`, data);

    return { success: "Sign up successful!" };
  } catch (error) {
    console.error("SIGNUP ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const signIn = async (data: z.infer<typeof signInSchema>) => {
  try {
    const validatedFields = signInSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const response = await axios.post(`${apiBaseUrl}/auth/sign-in`, data);
    const { user_id, token } = response.data;

    if (await redis.get(user_id)) {
      await redis.del(user_id);
    }

    await redis.set(user_id, token);
    cookies().set("_dropbox_auth_id", user_id);
    cookies().set("_dropbox_auth", token);

    return { success: "Sign in successful!" };
  } catch (error) {
    console.error("SIGNING ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const auth = async () => {
  const authCookie = cookies().get("_dropbox_auth");
  if (!authCookie) {
    return null;
  }

  const session = (await redis.get(authCookie.value)) as string;
  if (!session) {
    return null;
  }

  const jwt = jwtDecode(session);

  if (await validateJWT(jwt, authCookie.value)) {
    return null;
  }

  return session;
};

export const signOut = async () => {
  const authCookie = cookies().get("_dropbox_auth");
  if (!authCookie) {
    return { error: "Error!" };
  }

  await redis.del(authCookie.value);
  cookies().delete("_dropbox_auth");

  return;
};

export const getUser = async () => {
  try {
    const userId = getUserId();
    if (!userId) return { error: "Unauthorized!" };

    const res = await axios.get(`${apiBaseUrl}/user/get?id=${userId}`, {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("SIGNING ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};
