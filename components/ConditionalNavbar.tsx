"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isEditor = pathname?.startsWith("/editor");

  if (isEditor) return null;

  return <Navbar />;
}
