import "./globals.css";
import type { Metadata } from "next";

import { Toaster } from "sonner";
import { ThemeProvider } from "@/provider/theme-provider";

export const metadata: Metadata = {
  title: "Dropbox.com",
  description: "Dropbox",
  icons: {
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-right" richColors expand={true} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
