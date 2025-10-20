"use server";

import { client as redis } from "@/lib/redis";

export const getJwt = async (userId: string) => {
  return await redis.get(userId);
};
