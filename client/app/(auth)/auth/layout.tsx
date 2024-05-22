import React, { Suspense } from "react";
import { NavBar } from "./_components/navbar";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="w-full h-screen max-h-screen overflow-hidden">
        <NavBar />
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </Suspense>
  );
}
