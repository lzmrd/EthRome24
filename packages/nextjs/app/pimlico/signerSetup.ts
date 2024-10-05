import { privateKeyToAccount } from 'viem/accounts';


const privateKey = process.env.PRIVATE_KEY as `0x${string}` | undefined;

if (!privateKey || !privateKey.startsWith('0x')) {
  throw new Error('Invalid private key format in .env file');
}

export const owner = privateKeyToAccount(privateKey);