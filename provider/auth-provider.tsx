"use client";

import { useAuth } from "@clerk/nextjs";
import React from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <>
      {!isSignedIn && isLoaded && (
        <div className="h-full flex flex-col items-center justify-center">
          <div
            className="animate-spin inline-block w-6 h-6 border-[3px] border-current 
          border-t-transparent text-blue-600 rounded-full dark:text-blue-500 mt-[20%]"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {isSignedIn && !isLoaded && <>{children}</>}
    </>
  );
}
