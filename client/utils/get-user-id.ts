import { cookies } from "next/headers";

export const getUserId = () => {
  return cookies().get("_dropbox_auth")?.value;
};
