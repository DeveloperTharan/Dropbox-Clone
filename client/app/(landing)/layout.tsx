import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/action/auth";
import { Footer } from "@/components/landing/footer";
import { NavBar } from "@/components/landing/navbar";

export const metadata: Metadata = {
  title: "Dropbox.com",
  description: "Dropbox",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session) return redirect("/dashboard");

  return (
    <div className="overflow-x-hidden h-auto min-h-full w-full">
      <NavBar />
      <main className="h-full w-full">{children}</main>
      <Footer />
    </div>
  );
}
