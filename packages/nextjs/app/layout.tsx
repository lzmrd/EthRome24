
import React from "react";
import { getSession } from "./(auth)/action"; // Assicurati che il percorso sia corretto
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import Navbar from "~~/components/Navbar";
import { SessionData } from "./api/login/auth.types";

export const metadata: Metadata = {
  title: "Nome da definire",
  description: "Descrizione da definire",
};

export default async function ScaffoldEthApp({ children }: { children: React.ReactNode }) {
  const session: SessionData = await getSession();




  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          {session.isLoggedIn && (
            <Navbar />
          )
          }
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

