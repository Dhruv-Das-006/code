import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata: Metadata = {
  title: "D-Code | Online Code Editor",
  description: "A premium online coding environment for modern developers. Build, test, and ship code faster.",
  keywords: ["online code editor", "ide", "web development", "javascript editor", "react ide"],
  authors: [{ name: "D-Code Team" }],
  openGraph: {
    title: "D-Code | Online Code Editor",
    description: "A premium online coding environment for modern developers.",
    url: "https://dhruv-code.vercel.app",
    siteName: "D-Code",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "D-Code | Online Code Editor",
    description: "A premium online coding environment for modern developers.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-indigo-500/30" suppressHydrationWarning>
        <Providers>
          <div id="app-root" className="flex flex-col min-h-screen relative">
            <div className="bg-gradient-mesh" />
            <Navbar />
            <main className="grow relative z-10">
              {children}
            </main>
            <ConditionalFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
