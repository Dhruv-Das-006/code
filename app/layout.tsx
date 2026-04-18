import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

export const metadata: Metadata = {
  title: "D-Code | Online Code Editor",
  description: "A premium online coding environment for modern developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        <Providers>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
