// transactions.ts
import { parseEther } from 'viem';
import { createSmartAccountClient } from './smartAccountClient';

const sendTransaction = async () => {
  const smartAccountClient = await createSmartAccountClient();

  // Invia una singola transazione
  const txHash = await smartAccountClient.sendTransaction({
    to: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
    value: parseEther('0.1'),
  });

  console.log(`Transaction Hash: ${txHash}`);
};

const sendBatchTransactions = async () => {
  const smartAccountClient = await createSmartAccountClient();

  // Invia una serie di transazioni in batch
  const userOpHash = await smartAccountClient.sendUserOperation({
    calls: [
      {
        to: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
        value: parseEther('0.1'),
        data: '0x',
      },
      {
        to: '0x1440ec793aE50fA046B95bFeCa5aF475b6003f9e',
        value: parseEther('0.1'),
        data: '0x1234',
      },
    ],
  });

  console.log(`User Operation Hash: ${userOpHash}`);
};

sendTransaction(); // Chiamata per inviare una transazione
