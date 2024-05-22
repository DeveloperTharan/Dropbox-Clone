import { redis } from "@/lib/redis";
import { JwtPayload } from "jwt-decode";

export const validateJWT = async (token: JwtPayload, id: string) => {
  if (!token.exp) {
    return true;
  }

  const expDate = token.exp ?? token.exp * 1000;
  const expiry = new Date(expDate);

  const isExpires = expiry > new Date() ? false : true;

  if (isExpires) {
    await redis.del(id);
    return true;
  }

  return isExpires;
};
