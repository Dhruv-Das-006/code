"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
