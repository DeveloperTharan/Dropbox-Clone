import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/action/auth";
import { SideBar } from "@/components/main/sidebar";
import { NavBar } from "@/components/main/navbar";
import { getUserId } from "@/utils/get-user-id";
import axios from "axios";
import { getJwt } from "@/utils/get-jwt";

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
  const session = await auth();
  if (!session) return redirect("/");

  const userId = getUserId();

  if (!userId) return redirect("/");

  const res = await axios.get(`${apiBaseUrl}/folder/get?userId=${userId}`, {
    headers: {
      Authorization: `Bearer ${await getJwt(userId)}`,
    },
  });

  return (
    <div className="flex flex-row h-full overflow-visible">
      <SideBar folder={res.data} />
      <main className="h-full w-full md:ml-[17rem]">
        <NavBar folder={res.data} />
        <div className="mx-5 md:ml-1 md:mr-6 h-full">{children}</div>
      </main>
    </div>
  );
}
