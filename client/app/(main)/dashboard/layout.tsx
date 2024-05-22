import { Metadata } from "next";

import { SideBar } from "./_components/sidebar";
import { NavBar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Dashboard | Dropbox.com",
  description: "Dropbox",
};

const apiBaseUrl = process.env.API_BASE_URL!;

export default async function Dashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row h-full">
      <SideBar />
      <main className="h-full w-full md:ml-[17rem] z-0">
        <NavBar />
        <div className="mx-5 md:ml-1 md:mr-6 h-full">{children}</div>
      </main>
    </div>
  );
}
