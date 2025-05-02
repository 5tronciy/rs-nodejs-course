import { createInterface } from 'node:readline/promises';

export const startCLI = async () => {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', async (line) => {
    if (line === '.exit') {
      rl.close();
      return;
    }
  });

  return new Promise((resolve) => {
    rl.on('close', () => {
      resolve();
    });
  });
};