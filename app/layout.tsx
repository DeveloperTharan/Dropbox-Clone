import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/provider/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { EdgeStoreProvider } from "@/lib/edgestore";
import ConvexClientProvider from "@/provider/ConvexClientProvider";
import { Toaster } from "sonner";

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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body>
          <ConvexClientProvider>
            <EdgeStoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster position="top-right" richColors expand={true}/>
                {children}
              </ThemeProvider>
            </EdgeStoreProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
