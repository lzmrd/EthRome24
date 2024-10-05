"use client";

import React from "react";
import { getSession } from "./(auth)/action";
import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";
import Navbar from "~~/components/Navbar";
import { SessionData } from "./api/login/auth.types";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config';


const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
              {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}