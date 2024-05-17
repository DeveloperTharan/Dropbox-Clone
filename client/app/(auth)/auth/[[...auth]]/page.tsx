import React from "react";
import { redirect } from "next/navigation";

import { Routes } from "@/components/auth/routes";
import { handleAuthRoute } from "@/utils/route-handler";

export default function AuthPage({ params }: { params: { auth: string[] } }) {
  const { auth } = params;

  if (!auth) return redirect("/");

  handleAuthRoute(auth);

  return <Routes route={auth[0]} />;
}
