import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";

import axios from "axios";
import { user } from "@/types/user-type";
import { getJwt } from "@/utils/get-jwt";
import { getUserId } from "@/utils/get-user-id";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "lucide-react";
import Link from "next/link";
import { SignOut } from "@/action/auth";

const apiBaseUrl = process.env.API_BASE_URL!;

export const UserMenu = async () => {
  const userId = getUserId();
  if (!userId) return redirect("/");

  const { data }: { data: user } = await axios.get(
    `${apiBaseUrl}/user/get?id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${await getJwt(userId)}`,
      },
    }
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {!data.image_url ? (
          <User />
        ) : (
          <Image src={data.image_url} alt="user" width={80} height={80} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{data.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <form
            action={async () => {
              "use server";
              await SignOut();
              redirect("/");
            }}
          >
            <button type="submit">SignOut</button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
