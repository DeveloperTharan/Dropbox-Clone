import { Metadata } from "next";

import { Footer } from "./_components/footer";
import { NavBar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Dropbox.com",
  description: "Dropbox",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden h-auto min-h-full w-full">
      <NavBar />
      <main className="h-full w-full">{children}</main>
      <Footer />
    </div>
  );
}
