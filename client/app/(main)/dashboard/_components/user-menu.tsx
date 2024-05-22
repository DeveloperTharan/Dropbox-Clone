"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "lucide-react";
import { useGetUser } from "@/query/auth/api/use-get-user";
import { Skeleton } from "@/components/ui/skeleton";
import { signOut } from "@/action/auth";
import { useRouter } from "next/navigation";

export const UserMenu = () => {
  const [isPending, startTransition] = useTransition();

  const { data, isLoading } = useGetUser();

  const router = useRouter();

  if (isLoading) {
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Skeleton className="w-32 rounded-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Skeleton className="w-full rounded-md" />
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Skeleton className="w-full rounded-md" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Skeleton className="w-full rounded-md" />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Skeleton className="w-full rounded-md" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {!data?.image_url ? (
          <User />
        ) : (
          <Image src={data?.image_url} alt="user" width={80} height={80} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{data?.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            startTransition(() => {
              signOut();
              router.push("/");
            });
          }}
          disabled={isPending}
        >
          SignOut
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
