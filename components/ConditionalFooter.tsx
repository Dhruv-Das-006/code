"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  const isEditor = pathname === "/editor";

  if (isEditor) return null;

  return <Footer />;
}
