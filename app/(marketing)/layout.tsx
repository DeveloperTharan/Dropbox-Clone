import { Metadata } from "next";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";

export const metadata: Metadata = {
  title: "Dropbox.com",
  description: "Dropbox",
};

export default function RootLayout({
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
