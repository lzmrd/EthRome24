// "use client";

// import { useWallets } from "@privy-io/react-auth";
// import { baseSepolia } from "viem/chains"; // Replace this with the chain used by your application
// import { http } from "viem";
// import { createSmartAccountClient, SmartAccountClient } from "permissionless";
// import { toSimpleSmartAccount } from "permissionless/accounts";
// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useSetActiveWallet } from "@privy-io/wagmi";
// import { useAccount, usePublicClient, useWalletClient } from "wagmi";
// import { pimlicoClient, pimlicoRpcUrl } from "./clientSetup";
// // import { entryPoint07Address } from "viem/account-abstraction";

// export default function usePimlico() {
//   const { isConnected } = useAccount();
//   const [smartAccountClient, setSmartAccountClient] =
//     useState<SmartAccountClient | null>(null);
//   const publicClient = usePublicClient();
//   const { wallets } = useWallets();
//   const { data: walletClient } = useWalletClient();
//   const { setActiveWallet } = useSetActiveWallet();

//   const embeddedWallet = useMemo(
//     () => wallets.find((wallet) => wallet.walletClientType === "privy"),
//     [wallets]
//   );

//   const fetchPimlicoSmartAccount = useCallback(async () => {
//     if (!publicClient || !walletClient) return;

//     const simpleSmartAccount = await toSimpleSmartAccount({
//       client: publicClient,
//       owner: walletClient,
//       entryPoint: {
//         address: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
//         version: "0.7",
//       }, // global entrypoint
//     });

//     const smartAccountClient = createSmartAccountClient({
//       account: simpleSmartAccount,
//       chain: baseSepolia,
//       bundlerTransport: http(pimlicoRpcUrl(baseSepolia), {}),
//       paymaster: pimlicoClient(baseSepolia),
//       userOperation: {
//         estimateFeesPerGas: async () => {
//           return (await pimlicoClient(baseSepolia).getUserOperationGasPrice())
//             .fast;
//         },
//       },
//     });
//     setSmartAccountClient(smartAccountClient);
//     return smartAccountClient;
//   }, [publicClient, walletClient]);

//   const predictSmartAccountAddress = async () => {
//     if (!publicClient || !walletClient) return;

//     const simpleSmartAccount = await toSimpleSmartAccount({
//       client: publicClient,
//       owner: walletClient,
//       entryPoint: {
//         address: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
//         version: "0.7",
//       }, // global entrypoint
//     });
//     return simpleSmartAccount.address;
//   }

//   useEffect(() => {
//     if (embeddedWallet) {
//       setActiveWallet(embeddedWallet);
//     }
//   }, [embeddedWallet, setActiveWallet]);

//   useEffect(() => {
//     if (isConnected && walletClient && publicClient) {
//       fetchPimlicoSmartAccount();
//     }
//   }, [isConnected, walletClient, publicClient, fetchPimlicoSmartAccount]);

//   return { smartAccountClient, predictSmartAccountAddress };
// }
