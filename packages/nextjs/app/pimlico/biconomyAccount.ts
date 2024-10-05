// biconomyAccount.ts
import { toBiconomySmartAccount } from 'permissionless/accounts';
import { publicClient } from './clientSetup';
import { owner } from './signerSetup';7


export const createBiconomyAccount = async () => {
  const biconomyAccount = await toBiconomySmartAccount({
    client: publicClient,
    owners: [owner],
    index: 0n, // Puoi cambiare l'indice per creare altri account con lo stesso signer
  });

  return biconomyAccount;
};
