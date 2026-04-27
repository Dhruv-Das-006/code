"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const isEditor = pathname?.startsWith("/editor");

  // Removed the isEditor check to always show Navbar as requested
  return <Navbar />;
}
