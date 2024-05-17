import { redis } from "@/lib/redis";

export const getJwt = async (userId: string) => {
  return await redis.get(userId);
};
