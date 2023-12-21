import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dropbox - 404",
  description: "Dropbox - 404",
};

function NotFound() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 space-y-4">
      <Image src="not-found.svg" alt="not-found/img" width={300} height={300} />
      <h1 className="text-4xl font-light text-center">Error (404)</h1>
      <div className="mt-10 text-center">
        <h6 className="text-sm font-light">
          Here are a few links that may be helpful:
        </h6>
        <div className="mt-6 flex flex-col gap-y-4 justify-center items-center">
          <Link
            href="/"
            className="text-sm font-light text-blue-500 hover:underline"
          >
            Home
          </Link>
          <Link
            href="/sign-in"
            className="text-sm font-light text-blue-500 hover:underline"
          >
            SignIn
          </Link>
          <Link
            href="/sign-up"
            className="text-sm font-light text-blue-500 hover:underline"
          >
            SignUp
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
