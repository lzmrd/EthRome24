"use client";

import { useWallets } from "@privy-io/react-auth";
import { baseSepolia } from "viem/chains";
import { http } from "viem";
import { createSmartAccountClient, SmartAccountClient } from "permissionless";
import { toSimpleSmartAccount } from "permissionless/accounts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import { pimlicoClient, pimlicoRpcUrl } from "./clientSetup";

export default function usePimlico() {
  const { isConnected } = useAccount();
  const [smartAccountClient, setSmartAccountClient] = useState<SmartAccountClient | null>(null);
  const publicClient = usePublicClient();
  const { wallets } = useWallets();
  const { data: walletClient } = useWalletClient();
  const { setActiveWallet } = useSetActiveWallet();

  const embeddedWallet = useMemo(() => wallets.find((wallet) => wallet.walletClientType === "privy"), [wallets]);

  const fetchPimlicoSmartAccount = useCallback(async () => {
    if (!publicClient || !walletClient) return;

    try {
      const simpleSmartAccount = await toSimpleSmartAccount({
        client: publicClient,
        owner: walletClient,
        entryPoint: {
          address: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
          version: "0.6",
        }, // global entrypoint
      });

      const smartAccountClient = createSmartAccountClient({
        account: simpleSmartAccount,
        chain: baseSepolia,
        bundlerTransport: http(pimlicoRpcUrl(baseSepolia), {}),
        paymaster: pimlicoClient(baseSepolia),
        userOperation: {
          estimateFeesPerGas: async () => {
            return (await pimlicoClient(baseSepolia).getUserOperationGasPrice()).fast;
          },
        },
      });
      setSmartAccountClient(smartAccountClient);
      return smartAccountClient;
    } catch (error) {
      console.error("Errore nel creare lo SmartAccountClient:", error);
      return null;
    }
  }, [publicClient, walletClient]);

  const predictSmartAccountAddress = async () => {
    if (!publicClient || !walletClient) return;

    try {
      const simpleSmartAccount = await toSimpleSmartAccount({
        client: publicClient,
        owner: walletClient,
        entryPoint: {
          address: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
          version: "0.6",
        }, // global entrypoint
      });
      return simpleSmartAccount.address;
    } catch (error) {
      console.error("Errore nel prevedere l'indirizzo dello Smart Account:", error);
      return null;
    }
  };

  useEffect(() => {
    if (embeddedWallet) {
      setActiveWallet(embeddedWallet);
    }
  }, [embeddedWallet, setActiveWallet]);

  useEffect(() => {
    if (isConnected && walletClient && publicClient) {
      fetchPimlicoSmartAccount();
    }
  }, [isConnected, walletClient, publicClient, fetchPimlicoSmartAccount]);

  return { smartAccountClient, predictSmartAccountAddress };
}
