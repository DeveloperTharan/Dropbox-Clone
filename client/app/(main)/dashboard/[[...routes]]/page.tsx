import React from "react";
import { Metadata } from "next";

import { Routes } from "@/components/main/routes";
import { Dashboard } from "@/components/main/pages/dashboard";

export async function generateMetadata({
  params,
}: {
  params: { routes: string[] };
}): Promise<Metadata> {
  const { routes } = params;

  if (!routes)
    return {
      title: "Dashboard | Dropbox",
    };

  return {
    title: `${
      routes[0].charAt(0).toUpperCase() + routes[0].slice(1).toLowerCase()
    } | Dropbox`,
  };
}

export default async function RoutesPage({
  params,
}: {
  params: { routes: string[] };
}) {
  const { routes } = params;

  if (!routes) {
    return <Dashboard />;
  }

  return <Routes slug={routes} />;
}
