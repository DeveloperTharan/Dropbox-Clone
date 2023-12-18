import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/provider/ConvexClientProvider";

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
    <ClerkProvider>
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
