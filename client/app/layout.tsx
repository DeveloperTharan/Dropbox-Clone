import "./globals.css";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/provider/theme-provider";
import { QueryClientProviders } from "@/provider/query-provider";
import { ModelProvider } from "@/provider/model-provider";

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
        <QueryClientProviders>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModelProvider />
            <Toaster />
            {children}
          </ThemeProvider>
        </QueryClientProviders>
      </body>
    </html>
  );
}
