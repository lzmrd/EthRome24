// smartAccountClient.ts
import { createSmartAccountClient as permissionlessCreateSmartAccountClient } from 'permissionless'; // Assicurati di importare solo questa versione
import { sepolia } from 'viem/chains';
import { pimlicoClient } from './clientSetup';
import { createBiconomyAccount } from './biconomyAccount';
import { http } from 'viem'

export const createSmartAccountClient = async () => {
  const biconomyAccount = await createBiconomyAccount();

  const smartAccountClient = permissionlessCreateSmartAccountClient({
    account: biconomyAccount,
    chain: sepolia,
    bundlerTransport: http('https://api.pimlico.io/v2/sepolia/rpc?apikey=API_KEY'),
    paymaster: pimlicoClient,
    userOperation: {
      estimateFeesPerGas: async () => (await pimlicoClient.getUserOperationGasPrice()).fast,
    },
  });

  return smartAccountClient;
};
