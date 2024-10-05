// import { createPimlicoClient } from "permissionless/clients/pimlico";
// import { Chain, http } from "viem";
// // import { entryPoint07Address } from "viem/account-abstraction";

// if (!process.env.NEXT_PUBLIC_PIMLICO_API_KEY)
//   throw new Error("Missing NEXT_PUBLIC_PIMLICO_API_KEY");

// export const pimlicoRpcUrl = (chain: Chain) =>
//   `https://api.pimlico.io/v2/${chain.id}/rpc?apikey=${process.env.NEXT_PUBLIC_PIMLICO_API_KEY}`;

// export const pimlicoClient = (chain: Chain) =>
//   createPimlicoClient({
//     transport: http(pimlicoRpcUrl(chain)),
//     entryPoint: {
//       address: "0x0576a174D229E3cFA37253523E645A78A0C91B57",
//       version: "0.6",
//     },
//   });
