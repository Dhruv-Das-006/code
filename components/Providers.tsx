"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import AuthWrapper from "./AuthWrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthWrapper>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-center" />
          {children}
        </ThemeProvider>
      </AuthWrapper>
    </Provider>
  );
}
