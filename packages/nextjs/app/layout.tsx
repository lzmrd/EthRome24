import React from "react";
import { getSession } from "./(auth)/action";
import Login from "./(auth)/login/page";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import UserInfo from "~~/components/UserInfo";
import "~~/styles/globals.css";

// import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

// export const metadata = getMetadata({
//   title: "Scaffold-ETH 2 App",
//   description: "Built with 🏗 Scaffold-ETH 2",
// });

export const metadata: Metadata = {
  title: {
    template: "Nome da definire | %s ",
    default: "Nome da definire",
  },
};

export default async function ScaffoldEthApp({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          {session.isLoggedIn ? (
            <>
              <ScaffoldEthAppWithProviders>
                <UserInfo />
                {children}
              </ScaffoldEthAppWithProviders>
            </>
          ) : (
            <Login />
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
