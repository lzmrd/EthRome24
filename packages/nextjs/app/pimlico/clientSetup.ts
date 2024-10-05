// clientSetup.ts
import { createPublicClient, http } from 'viem';
import { createPimlicoClient } from 'permissionless/clients/pimlico';
import { sepolia } from 'viem/chains';
 
export const publicClient = createPublicClient({
  transport: http('https://rpc.ankr.com/eth_sepolia'),
});

export const pimlicoClient = createPimlicoClient({
  chain: sepolia,
  transport: http('https://api.pimlico.io/v2/sepolia/rpc?apikey=pim_2oXcvbCpjVnEf7QP8KL8G8'),
  entryPoint: {
    address: '0x0576a174D229E3cFA37253523E645A78A0C91B57', // Sostituisci con l'address dell'entry point corretto
    version: '0.6',
  },
});
