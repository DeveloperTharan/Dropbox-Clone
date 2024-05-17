"use server";

import { z } from "zod";
import axios from "axios";
import { redis } from "@/lib/redis";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { signUpSchema, signInSchema } from "@/schema/auth";
import { validateJWT } from "@/utils/validate-jwt";
import { redirect } from "next/navigation";

const apiBaseUrl = process.env.API_BASE_URL;

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
  try {
    const validateFields = signUpSchema.safeParse(data);

    if (!validateFields.success) return { error: "Invalid fields!" };

    await axios.post(`${apiBaseUrl}/auth/sign-up`, data);

    return { success: "SignUp successfully!" };
  } catch (error) {
    console.log("SIGNUP ERROR", error);
    return { error: "something went's wrong try again!" };
  }
};

export const SignIn = async (data: z.infer<typeof signInSchema>) => {
  try {
    const validateFields = signInSchema.safeParse(data);

    if (!validateFields.success) return { error: "Invalid fields!" };

    const res = await axios.post(`${apiBaseUrl}/auth/sign-in`, data);
    const { user_id, token } = res.data;

    if (await redis.get(user_id)) {
      await redis.del(user_id);
    }

    await redis.set(user_id, token);
    cookies().set("_dropbox_auth", user_id);

    return { success: "SignIn successful!" };
  } catch (error) {
    console.log("SIGNING ERROR", error);
    return { error: "Something went wrong. Please try again!" };
  }
};

export const auth = async () => {
  const auth = cookies().get("_dropbox_auth");
  if (!auth) return null;

  const session = (await redis.get(auth?.value)) as string;
  if (!session) return null;

  const jwt = jwtDecode(session);

  if (await validateJWT(jwt, auth.value)) return null;

  return session;
};

export const SignOut = async () => {
  const auth = cookies().get("_dropbox_auth");
  if (!auth) return { error: "error!!!" };

  await redis.del(auth?.value);
  cookies().delete("_dropbox_auth");

  return;
};
