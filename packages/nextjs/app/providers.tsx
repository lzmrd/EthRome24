"use client";

import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "~~/styles/globals.css";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { PrivyProvider } from "@privy-io/react-auth";

const queryClient = new QueryClient();

type Props = {
    children: React.ReactNode;
};

export default function Providers({ children }: Props) {
    return (
        <PrivyProvider clientId="client-WY5bt1isnZMJDLmp8WYJGaxYiTwnkfJwDXcs6kR85sTyW" appId="cm1wkf9k802alqu6jliuirwpg">
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </PrivyProvider>
    );
}
