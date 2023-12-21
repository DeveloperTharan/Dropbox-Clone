import { Metadata } from "next";
import SideBar from "./_components/SideBar";
import NavBar from "./_components/NavBar";
import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
  title: "Dashboard | Dropbox.com",
  description: "Dropbox",
};

export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <ConvexClientProvider>
      <EdgeStoreProvider>
        <div className="flex flex-row">
          <SideBar />
          <main className="flex-1 relative h-full w-full md:pl-[17rem]">
            <NavBar />
            <div className="mx-5 md:ml-1 md:mr-6 h-full">{children}</div>
          </main>
        </div>
      </EdgeStoreProvider>
    </ConvexClientProvider>
  );
}
