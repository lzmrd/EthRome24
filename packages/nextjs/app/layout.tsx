import React from "react";
import { getSession } from "./(auth)/action";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import Navbar from "~~/components/Navbar";
import { SessionData } from "./api/login/auth.types";
import Providers from "./providers";

/* const config = createConfig({
  autoConnect: true,
  publicClient: publicProvider(),
  chains: [sepolia],
});
 */
export const metadata: Metadata = {
  title: "Nome da definire",
  description: "Descrizione da definire",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session: SessionData = await getSession();

  return (
    <html suppressHydrationWarning>
      <body>
        <Providers>
          <ThemeProvider enableSystem>
            {session.isLoggedIn && <Navbar />}
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
