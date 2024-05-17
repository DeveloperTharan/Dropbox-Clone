import React from "react";
import { redirect } from "next/navigation";

import { auth } from "@/action/auth";
import { NavBar } from "@/components/auth/navbar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (session) return redirect("/dashboard");

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden">
      <NavBar />
      <div className="w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
